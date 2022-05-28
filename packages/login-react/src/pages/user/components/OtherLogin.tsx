import {Divider, Modal, Space} from 'antd';
import React, {CSSProperties, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'umi';
import { WechatOutlined } from '@ant-design/icons';
import { ConnectState } from '@/models/connect';
import type { GetAppIdResp } from '@/types/user';
import QrCode from './QrCode';
import LogoButton from "@/pages/user/components/LogoButton";

const OtherLogin: React.FC<{ applicationId: any }> = (props: any) => {
  const appIdList = useSelector<ConnectState, GetAppIdResp[]>((state) => state.login.appIdList);
  const [creating, setCreating] = useState(false);
  const dispatch = useDispatch();

  const getAppIds = (appId: string) => {
    dispatch({
      type: 'login/getAppIdList',
      payload: { appId: appId },
    });
  };

  const showModal = (show: boolean) => {
    setCreating(show);
  };

  useEffect(() => {
    console.log(props.applicationId);
    if (typeof props.applicationId !== 'undefined') {
      getAppIds(props.applicationId);
    }
  }, []);

  console.log(appIdList);

  const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  const buttonMap: Map<string, any> = new Map();
  const wxLogo = (
    <LogoButton logo={<WechatOutlined style={{ ...iconStyles, color: '#04BE02' }}  />} showModal={showModal}></LogoButton>
  )
  buttonMap.set(
    'wx-web',
    wxLogo,
  );

  const appLogin = appIdList.map((app: GetAppIdResp, index) => (
    <div key={index} style={{ display: 'inline-block' }}>
      {buttonMap.get(app.identityProviderTemplateId)}
      <Modal
        key={index}
        destroyOnClose
        visible={creating}
        title={null}
        footer={null}
        onCancel={() => setCreating(false)}
      >
        <QrCode appInfo={app} applicationId={props.applicationId}></QrCode>
      </Modal>
    </div>
  ));

  if (appIdList.length > 0) {
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

export default OtherLogin;
