import {Divider, Modal, Space} from 'antd';
import React, {CSSProperties, useState} from 'react';
import { WechatOutlined,DingdingOutlined } from '@ant-design/icons';
import QrCode from '../OtherLogin/QrCode';
import LogoButton from "../LogoButton/index";

const Index: React.FC<{ applicationId: any,appInfo:any }> = (props: any) => {
  const [creating, setCreating] = useState(false);
  const [creatDD, setCreatDD] = useState(false);
  const showModal = (show: boolean,type: string) => {
    if (type === "wx-web"){
      setCreating(show);
    }
    if (type === "dd-web"){
      setCreatDD(show);
    }
  };


  const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  //console.log(props.appInfo)
  if (typeof props.appInfo=='undefined'){
    return <></>;
  }
  const appLogin = props.appInfo.identityProviders.map((identityProvider:any, index:any) =>  {
    if (identityProvider.identityProviderType === 'wx-web') {
      return (
        <div key={index} style={{ display: 'inline-block' }}>
          <LogoButton logo={<WechatOutlined style={{ ...iconStyles, color: '#04BE02' }}  />} showModal={showModal} type="wx-web"></LogoButton>
          <Modal
            destroyOnClose
            visible={creating}
            title={null}
            footer={null}
            onCancel={() => setCreating(false)}
          >
            {<QrCode  identityProvider={identityProvider} applicationId={props.applicationId} loginCallBackURL={props.appInfo.loginCallBackURL}></QrCode>}
          </Modal>
        </div>
      );
    } else if (identityProvider.identityProviderType === 'dd-web') {
      return (
        <div key={index} style={{ display: 'inline-block' }}>
          <LogoButton logo={<DingdingOutlined style={{ ...iconStyles, color: '#464DC2FF' }}  />} showModal={showModal} type="dd-web"></LogoButton>
          <Modal
            destroyOnClose
            visible={creatDD}
            title={null}
            footer={null}
            onCancel={() => setCreatDD(false)}
          >
            {<QrCode identityProvider={identityProvider} applicationId={props.applicationId} loginCallBackURL={props.appInfo.loginCallBackURL}></QrCode>}
          </Modal>
        </div>
      );
    } else {
      return undefined;
    }
  })

  if (props.appInfo.identityProviders.length > 0) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Divider plain>
              <span style={{ color: '#CCC', fontWeight: 'normal', fontSize: 14 }}>
                第三方账号登录
              </span>
        </Divider>
        <Space align="center" size={24}>
          {appLogin}
        </Space>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Index;
