import React, {useEffect, useState} from 'react';
import { RedoOutlined } from '@ant-design/icons';
import axios from "axios";
import {apiServer} from "../config/env";
import {WxLogin,DDLogin} from "../OtherLogin/js/qrLogin";
const QrCode: React.FC<{ identityProvider: any; applicationId: string ;loginCallBackURL:string}> = (props: any) => {
  const [wxState, setWxState] = useState<any>('');

  const redirect_uri = encodeURIComponent(
    `http://api.changefin.com:3000/api/v1/auth/callBack`,
  );
  let goto
  const getWxState = () => {
    //console.log(props.identityProvider)
    axios({
      method:"GET",
      url:`${apiServer}/api/v1/auth/state?appId=${props.applicationId}&type=${props.identityProvider.identityProviderType}`
    }).then(response=>{
      if(response.status == 200){
        setWxState(response.data)
      }
    })
  };

  useEffect(() => {
    console.log(props.identityProvider);
    getWxState();
  }, []);

  useEffect(() => {
    if (wxState === ''){
      return
    }
    //console.log(props);
    if (props.identityProvider.identityProviderType === 'wx-web') {
      WxLogin({
        self_redirect: false,
        id: 'login_container',
        appid: props.identityProvider.appId,
        scope: 'snsapi_login',
        redirect_uri: redirect_uri,
        state: wxState,
        style: 'black',
        href: '',
      });
    }

    if ( props.identityProvider.identityProviderType === 'dd-web') {
      goto = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${props.identityProvider.appId}&response_type=code&scope=snsapi_login&state=${wxState}&redirect_uri=${redirect_uri}`

      //console.log(goto)
      DDLogin({
        id: 'login_container',
        goto: encodeURIComponent(goto),
        style: 'border:none;background-color:#FFFFFF;',
        width: '300',
        height: '400',
      });
      handleMessage(event);
    }
  }, [wxState]);

  const handleMessage = (e: any) => {
    const origin = e.origin;
    console.log('origin', e.origin);
    if (origin == 'https://login.dingtalk.com') {
      //判断是否来自ddLogin扫码事件。
      const loginTmpCode = e.data;
      //获取到loginTmpCode后就可以在这里构造跳转链接进行跳转了

      console.log('loginTmpCode', loginTmpCode);
      if (typeof loginTmpCode !== 'undefined') {
        const url = `${goto}&loginTmpCode=${loginTmpCode}`;
        window.location.href = url;
      }
    }
  };

  const attachEvent = (window as any).attachEvent
  if (typeof window.addEventListener != 'undefined') {
    window.addEventListener('message', handleMessage, false);
  } else if (typeof attachEvent != 'undefined') {
    attachEvent('onmessage', handleMessage);
  }

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
