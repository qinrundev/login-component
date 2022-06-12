import { Avatar, Button, Input, Checkbox, Modal, message } from 'antd';
import {
  LockOutlined,
  UserOutlined,
  GlobalOutlined,
  CheckCircleTwoTone,
  PlusOutlined,
} from '@ant-design/icons';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { SelectLang, useDispatch } from 'umi';
import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import RelationCreation from '@/pages/user/components/RelationCreation';
import OtherLogin from '@/pages/user/components/OtherLogin';
import type { LoginParams } from '@/types/user';
import logo from '@/assets/logo.svg';
import styles from './index.less';
import { GetWxUserInfoResp } from '@/types/user';

interface LoginProps {
  applicationId: string,
  onLogin?: any,
  onLoad?: any,
  code?: string,
  state?: string
}

type LoginStep = 'login' | 'relation';

const Login: React.FC<LoginProps> = (props: any) => {
  const [userInfo, setUserInfo] = useState<any>(undefined);
  const [LoginStep, setLoginStep] = useState<LoginStep>('login');
  const [creating, setCreating] = useState(false);
  const [avatar, setAvatar] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [useHeadImgUrl, setUseHeadImgUrl] = useState<boolean>(true);
  const dispatch = useDispatch();

  const handleSubmit = async (values: LoginParams) => {
    dispatch({
      type: 'login/login',
      payload: {
        params: values,
        onSuccess: (data: any) => {
          message.success('登录成功');
          setUserInfo({ userInfo: data.userInfo, logout: loginOut });
          props.onLogin(data);
          // window.location.href = '/';
        },
        onError: (msg?: string) => {
          message.error(msg || '登录失败');
        },
      },
    });
  };

  const handleAppSubmit = (appId: string, values: LoginParams) => {
    dispatch({
      type: 'login/appLogin',
      payload: {
        appId: appId,
        params: values,
        onSuccess: () => {
          message.success('登录成功');
          window.location.href = '/';
        },
        onError: (msg?: string, data?: GetWxUserInfoResp, code?: number) => {
          console.log(code);

          if (code === 401 && values.grant_type === 'wx-web' && data) {
            const { nickname, headimgurl } = data as GetWxUserInfoResp;
            console.log(data);
            setLoginStep('relation');
            setDisplayName(nickname as string);
            setAvatar(headimgurl as string);
            setUseHeadImgUrl(true);
          } else {
            message.error(msg || '登录失败');
          }
        },
      },
    });
  };

  const loginOut = async () => {
    setUserInfo({ userInfo: undefined, logout: loginOut })
    //TODO API
    message.info('退出成功');
    window.location.reload();
  };

  useEffect(() => {
    props.onLoad(userInfo)
  }, [userInfo]);

  useEffect(() => {
    console.log('1234');
    console.log(props);
    if (
      typeof props.code !== 'undefined' &&
      props.code !== '' &&
      typeof props.applicationId !== 'undefined' &&
      props.applicationId !== ''
    ) {
      console.log('wx-web');
      const values = {
        username: props.state,
        password: props.code,
        grant_type: 'wx-web',
      };
      console.log(props.applicationId);
      console.log(values);
      handleAppSubmit(props.applicationId, values as LoginParams);
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang icon={<GlobalOutlined />} />}
      </div>
      {LoginStep === 'login' && (
        <div className={styles.content}>
          <LoginForm
            className={styles.form}
            logo={<img src={logo} alt="logo" />}
            subTitle='”瑶光”IDaaS平台'
            actions={[
              <OtherLogin
                key="otherLogin"
                applicationId={props.applicationId}
              ></OtherLogin>,
            ]}
            onFinish={async (values) => {
              values.grant_type = 'password';
              console.log(values);
              await handleSubmit(values as LoginParams);
            }}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            />
          </LoginForm>
        </div>
      )}
      {LoginStep === 'relation' && (
        <div
          className={styles.content}
        >
          <div style={{ width: 400, height: '100%' }}>
            <ProFormText>
              <CheckCircleTwoTone style={{ fontSize: 40, margin: 10 }} />
              <span style={{ fontSize: 30 }}>扫码登录成功</span>
            </ProFormText>
            <ProFormText>
              <Avatar
                shape="square"
                size={64}
                icon={avatar ? <img src={avatar} /> : <UserOutlined />}
              />
            </ProFormText>
            <ProFormText>
              <Checkbox
                checked={useHeadImgUrl}
                onChange={(e) => {
                  setUseHeadImgUrl(e.target.checked);
                }}
              >
                使用默认头像
              </Checkbox>
            </ProFormText>
            <ProFormText>
              <Input
                style={{ width: '80%' }}
                size="large"
                placeholder="输入昵称"
                prefix="昵称:"
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
                value={displayName}
              />
            </ProFormText>

            <ProFormText>
              <Button
                style={{ width: '80%' }}
                icon={<PlusOutlined />}
                onClick={() => setCreating(true)}
              >
                已有账号,去关联
              </Button>
              <Modal
                destroyOnClose
                visible={creating}
                title="登录账号"
                footer={null}
                onCancel={() => setCreating(false)}
              >
                <RelationCreation
                  relation={{
                    displayName: displayName,
                    headimgurl: avatar,
                    useHeadImgUrl: useHeadImgUrl,
                  }}
                  onCancel={() => setCreating(false)}
                />
              </Modal>
            </ProFormText>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Login;
