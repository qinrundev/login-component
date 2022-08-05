import { LoginComponent } from '@zzx000/dumi-myapp';
function App() {
    const onLogin = (userInfo) => {
        console.log("userInfo:",userInfo);
    };

    const onLoad = (appInfo) => {
        console.log("appInfo:",appInfo);
    };
  return (
    <div className="App">
      <LoginComponent applicationId="c9kv27t80lic2dd0t0c0" onLogin={onLogin} onLoad={onLoad}/>
    </div>
  );
}

export default App;
