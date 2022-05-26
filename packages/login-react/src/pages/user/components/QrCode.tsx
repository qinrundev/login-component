import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import { ConnectState } from '@/models/connect';
import { GetAppIdResp } from '@/types/user';
import { RedoOutlined } from '@ant-design/icons';
const QrCode: React.FC<{ appInfo: GetAppIdResp; applicationId: string }> = (props: any) => {
  const wxState = useSelector<ConnectState, string>((state) => state.login.wxState);
  const dispatch = useDispatch();

  const getWxState = () => {
    dispatch({
      type: 'login/getState',
      payload: null,
    });
  };

  useEffect(() => {
    console.log(props.appInfo);
    getWxState();
  }, []);

  useEffect(() => {
    console.log(props);

    if (wxState !== '' && props.appInfo.identityProviderTemplateId === 'wx-web') {
      console.log(wxState);
      console.log(props.applicationId);
      new window.WxLogin({
        self_redirect: false,
        id: 'login_container',
        appid: props.appInfo.appid,
        scope: 'snsapi_login',
        redirect_uri: `http://console.changefin.com/user/login?application_id=${props.applicationId}`,
        state: wxState,
        style: 'black',
        href: '',
      });
    }
  }, [wxState]);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div id="login_container" key="login_container" style={{ margin: '0 auto' }} />
      </div>
      <div style={{ textAlign: 'right' }}>
        <RedoOutlined onClick={getWxState} />
      </div>
    </>
  );
};
export default QrCode;
