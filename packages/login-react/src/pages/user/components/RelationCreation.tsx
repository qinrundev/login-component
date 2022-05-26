import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'umi';

import React from 'react';
import { GetWxUserInfoResp, LoginParams } from '@/types/user';
import { queryCurrentUser } from '@/services/user';

interface RelationCreationProps {
  onCancel: () => void;
  relation: any;
}

const RelationCreation: React.FC<RelationCreationProps> = ({ onCancel, relation }) => {
  console.log(relation);
  const dispatch = useDispatch();

  const handleFinish = (loginParams: LoginParams) => {
    dispatch({
      type: 'login/login',
      payload: {
        params: loginParams,
        onSuccess: async () => {
          onCancel();
          const data = await queryCurrentUser();
          dispatch({
            type: 'login/createIdentityForUser',
            payload: {
              domainId: data.domainId,
              params: relation,
              onSuccess: () => {
                message.success('关联成功');
                window.location.href = '/';
              },
              onError: (msg?: string, code?: number) => {
                console.log(code);
                message.error(msg || '关联失败');
              },
            },
          });
        },
        onError: (msg?: string, data?: GetWxUserInfoResp, code?: number) => {
          console.log(code);
          message.error(msg || '登录失败');
        },
      },
    });
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={async (values) => {
        values.grant_type = 'password';
        console.log(values);
        await handleFinish(values as LoginParams);
      }}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password />
      </Form.Item>
      <div className="flex-end" style={{ marginTop: 24 }}>
        <Button
          className="btn-width"
          style={{ marginRight: 12 }}
          disabled={false}
          onClick={onCancel}
        >
          取消
        </Button>
        <Button className="btn-width" type="primary" htmlType="submit" loading={false}>
          关联
        </Button>
      </div>
    </Form>
  );
};

export default RelationCreation;
