import React, {useEffect, useState} from 'react';
import { RedoOutlined } from '@ant-design/icons';
import axios from 'axios';
import {apiServer} from '../config/env'
import './WxQrCode'
const QrCode: React.FC<{ appInfo: any; applicationId: string ;loginCallBackURL:string}> = (props: any) => {
  const [wxState, setWxState] = useState("");

  const getWxState = () => {
    axios({
      method:"GET",
      url:`${apiServer}/api/v1/auth/state?appId=${props.applicationId}&type=${props.appInfo.identityProviderType}`
    }).then(response=>{
     if(response.data){
       setWxState(response.data)
     }
    })
  };

  useEffect(() => {
    console.log(props.appInfo);
    getWxState();
  }, []);

  useEffect(() => {
    console.log(props);

    if (wxState !== '' && props.appInfo.identityProviderType === 'wx-web') {
      console.log(wxState);
      console.log(props.applicationId);
      const redirect_uri ='http://api.changefin.com:3001'
      console.log(redirect_uri)
      /*new window.WxLogin({
        self_redirect: true,
        id: 'login_container',
        appid: props.appInfo.appId,
        scope: 'snsapi_login',
        redirect_uri: redirect_uri,
        state: wxState,
        style: 'black',
        href: '',
      });*/
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
