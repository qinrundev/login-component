
## LoginComponent

Demo:

```tsx
import React from 'react';
import { LoginComponent } from '@qinrun/login-react';

const onLogin = (userInfo) => {
  console.log("userInfo",userInfo);
};

const onLoad = (appInfo) => {
  console.log("appInfo",appInfo);
};

export default () => {
  return <LoginComponent applicationId={'caasi1d80li95sj7otlg'}   onLogin={onLogin} onLoad={onLoad}/>
}
```
