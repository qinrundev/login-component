import { Avatar, Button, Input, Checkbox, Modal, message } from 'antd';
import {
    LockOutlined,
    UserOutlined,
    GlobalOutlined,
    CheckCircleTwoTone,
    PlusOutlined,
} from '@ant-design/icons';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import React, {CSSProperties, useEffect, useState} from 'react';
import RelationCreation from './RelationCreation';
import OtherLogin from './OtherLogin';
import axios from "axios";
import {apiServer} from "@/config/env";

interface LoginProps {
    applicationId: string,
    onLogin?: any,
    onLoad?: any,
    code ?:string,
    state ?:string
}

interface LoginParams {
    username: string;
    password: string;
    grant_type: string;
}

export interface GetWxUserInfoResp {
    nickname?: string;
    headimgurl?: string;
}

const container: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'auto',
    background: '#f0f2f5',
    backgroundColor: 'whitesmoke',
}

const lang: CSSProperties = {
    width: '100%',
    height: '40px',
    lineHeight: '44px',
    textAlign: 'right',
    marginRight: '24px',
}

const content: CSSProperties = {
    flex: '1',
    padding: '32px 0',
    textAlign: 'center',
    margin: '0 auto',
    backgroundColor: '#FFFFFF',
    width: '456px',
}

const form: CSSProperties = {
    backgroundColor: '#FFFFFF',
    padding: '32px 24px'
}

type LoginStep = 'login' | 'relation';

const LoginComponent = (props: LoginProps) => {
    const [appInfo, setAppInfo] = useState<any>(undefined);
    const [LoginStep, setLoginStep] = useState<LoginStep>('login');
    const [creating, setCreating] = useState(false);
    const [avatar, setAvatar] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');
    const [useHeadImgUrl, setUseHeadImgUrl] = useState<boolean>(true);

    const getAppInfo = (appId: string) => {
        axios({
            method:"GET",
            url:`${apiServer}/api/v1/user-info`
        }).then(response=>{
            if(response.status == 200){
                setAppInfo(response.data)
                props.onLoad({appInfo})
            }
        })
    };

    const handleSubmit = (values: LoginParams) => {
        axios({
            method:"POST",
            url:`${apiServer}/auth/login`,
            data:values,
        }).then(response=>{
            if(response.status == 200){
                axios({
                    method:"GET",
                    url:`${apiServer}/api/v1/user-info`
                }).then(response=>{
                    if(response.status == 200){
                        message.success('登录成功');
                        props.onLoad({userInfo:response.data,appInfo:appInfo,logout:loginOut})
                        props.onLogin(response.data);
                    }
                })
            }
        })
    };

    const handleAppSubmit = (appId: string, values: LoginParams) => {
        axios({
            method:"POST",
            url:`${apiServer}/auth/login/${appId}`,
            data:values,
        }).then(response=>{
            if(response.status == 200){
                message.success('登录成功');
                window.location.href = '/';
            }else if (response.status == 401 && values.grant_type === 'wx-web' && response.data){
                const { nickname, headimgurl } = response.data as GetWxUserInfoResp;
                console.log(response.data);
                setLoginStep('relation');
                setDisplayName(nickname as string);
                setAvatar(headimgurl as string);
                setUseHeadImgUrl(true);
            }else {
                message.error( '登录失败');
            }
        })
    };

    const loginOut = async () => {
        props.onLoad(undefined)
        //TODO API
        message.info('退出成功');
        window.location.reload();
    };

    useEffect(() => {
        getAppInfo(props.applicationId);
    }, []);


    useEffect(() => {
        console.log(props);
        if (
            typeof props.code !== 'undefined'&&
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
    let subTitle
    if (typeof appInfo == 'undefined' || typeof appInfo.name == 'undefined') {
        subTitle= ''
    }else {
        console.log(appInfo)
        subTitle = appInfo.name
    }

    return (
        <div style={{ ...container}}>
            <div style={{ ...lang}}>
                <GlobalOutlined />
            </div>
            {LoginStep === 'login' && (
                <div style={{ ...content}}>
                    <LoginForm
                        style={{ ...form}}
                        //logo={<img src={logo} alt="logo" />}
                        subTitle={subTitle}
                        actions={[
                            <OtherLogin
                                key="otherLogin"
                                applicationId={props.applicationId}
                                appInfo = {appInfo}
                            ></OtherLogin>,
                        ]}
                        onFinish={async (values:any) => {
                            values.grant_type = 'password';
                            console.log(values);
                            await handleSubmit(values as LoginParams);
                        }}
                    >
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined />,
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
                                prefix: <LockOutlined />,
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
                    style={{ ...content}}
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

        </div>
    );
};

export default LoginComponent;