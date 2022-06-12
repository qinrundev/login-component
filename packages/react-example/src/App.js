import logo from './logo.svg';
import './App.css';

import { LoginComponent } from '@qinrun/login-react';

function App() {
  return (
    <div className="App">
      <LoginComponent appId="123" />
    </div>
  );
}

export default App;
