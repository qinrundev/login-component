import {Divider, Modal, Space} from 'antd';
import React, {CSSProperties, useState} from 'react';
import { WechatOutlined } from '@ant-design/icons';
//import QrCode from './QrCode';
//import LogoButton from "../LogoButton/index";

const Index: React.FC<{ applicationId: any,appInfo:any }> = (props: any) => {
  const [creating, setCreating] = useState(false);


  const showModal = (show: boolean) => {
    setCreating(show);
  };


  const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  const buttonMap: Map<string, any> = new Map();
  const wxLogo = (
   /* <LogoButton logo={<WechatOutlined style={{ ...iconStyles, color: '#04BE02' }}  />} showModal={showModal}></LogoButton>*/
    <button>abc</button>
  )
  buttonMap.set(
    'wx-web',
    wxLogo,
  );
  console.log(props.appInfo)
  if (typeof props.appInfo=='undefined'){
    return <></>;
  }
  const appLogin = props.appInfo.identityProviders.map((app:any, index:any) => (
    <div key={index} style={{ display:app.enabled ? 'inline-block':'none' }}>
      {buttonMap.get(app.identityProviderType)}
      <Modal
        key={index}
        destroyOnClose
        visible={creating}
        title={null}
        footer={null}
        onCancel={() => setCreating(false)}
      >
        {/*<QrCode appInfo={app} applicationId={props.applicationId} loginCallBackURL={props.appInfo.loginCallBackURL}></QrCode>*/}
      </Modal>
    </div>
  ));

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
