import type { ResponseError } from 'umi-request';
import Request, { extend } from 'umi-request';
import { notification } from 'antd';

const { isCancel } = Request;

const codeMessage = {
  401: '请重新登录',
  403: '您暂无权限执行此操作，请联系管理员',
  404: '请求未找到',
  500: '服务器发生错误，请稍后再试',
};

const errorHandler = (
  error: ResponseError<{ status: number; message: string }>,
): Response | { status: number; message: string } => {
  if (isCancel(error)) {
    throw error;
  }
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status } = response;

    if (status === 400) {
      // bad request
    } else if (status === 401) {
      // unauthorized
      //window.location.href = '/user/login';
    } else {
      notification.warning({
        message: `请求错误: ${status}`,
        description: errorText,
      });
    }
  } else if (!response) {
    notification.error({
      message: '网络异常',
      description: '您的网络发生异常，无法连接服务器',
    });
  }

  throw error;
};

const request = extend({
  errorHandler,
  credentials: 'include',
});

request.use(async (ctx, next) => {
  const { params } = ctx.req.options;
  if (params) {
    Object.keys(params).forEach((key) => {
      if (typeof params[key] === 'string') {
        params[key] = params[key].trim();
      }
    });
  }
  await next();
});

export default request;
