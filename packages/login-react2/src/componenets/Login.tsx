import React, { useState, CSSProperties } from "react";
import { WechatOutlined } from '@ant-design/icons';
import LogoButton from './LogoButton'
import LogoButton2 from '@/componenets/LogoButton2'

export interface LoginProps {
    appId: string;
}

const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

const LoginComponent = (props: LoginProps) => {
    const [creating, setCreating] = useState(false);
    return (
        <div>
            {props.appId}
            <LogoButton logo={<WechatOutlined style={{ ...iconStyles, color: '#04BE02' }} />} showModal={
                (show: boolean) => {
                    setCreating(show);
                }
            }></LogoButton>
            <LogoButton2 logo={<WechatOutlined style={{ ...iconStyles, color: '#04BE02' }} />} showModal={
                (show: boolean) => {
                    setCreating(show);
                }
            }></LogoButton2>
        </div>
    );
};

export default LoginComponent;