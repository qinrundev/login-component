import { Button, Result } from 'antd';
import { history } from 'umi';

const NoFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉，您所访问的页面不存在。"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        返回
      </Button>
    }
  />
);

export default NoFoundPage;
