import React from "react";

export interface LoginProps {
    appId: string;
}

const LoginComponent = (props: LoginProps) => {
    return <div>{props.appId}</div>;
};

export default LoginComponent;