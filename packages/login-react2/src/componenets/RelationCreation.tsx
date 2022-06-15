import { Form, Input, Button, message } from 'antd';

import React from 'react';
import axios from 'axios';
import {apiServer} from '../config/env'

interface RelationCreationProps {
  onCancel: () => void;
  relation: any;
}

interface LoginParams {
  username: string;
  password: string;
  grant_type: string;
}
const RelationCreation: React.FC<RelationCreationProps> = ({ onCancel, relation }) => {
  console.log(relation);

  const handleFinish = (loginParams: LoginParams) => {
    axios({
      method:"POST",
      url:`${apiServer}/auth/login`,
      data:loginParams,
    }).then(response=>{
      if(response.status == 200){
        axios({
          method:"GET",
          url:`${apiServer}/api/v1/user-info`
        }).then(response=>{
          if(response.status == 200){
            axios({
              method:"POST",
              url:`${apiServer}/api/v1/domains/${response.data.domainId}/users/identity-providers`,
              data:relation,
            }).then(response=>{
              if(response.status == 200){
                message.success('关联成功');
              }
            })
          }
        })
      }
    })
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={async (values:any) => {
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
