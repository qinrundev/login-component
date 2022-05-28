import Login from "@/pages/user/Login";
import { useState } from "react";

const TestLogin = () => {
  const appId = "c9kv27t80lic2dd0t0c0";

  const [guardAuthClient, setGuardAuthClient] = useState<any>(undefined);

  const onLogin = (userInfo: any) => {
    console.log(userInfo);
  };

  const onLoad = (authClient: any) => {
    console.log(authClient);
    console.log(123);
    setGuardAuthClient(authClient);
  };


  return (
    <>
      {guardAuthClient && <button onClick={async () => await guardAuthClient.logout()}>退出</button>}
      {!guardAuthClient && <Login applicationId={appId} onLogin={onLogin} onLoad={onLoad}></Login>}
    </>
  )
}

export default TestLogin;
