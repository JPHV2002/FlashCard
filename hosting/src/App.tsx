import { BrowserRouter, Routes,Route } from 'react-router-dom';

import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";

import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path = "/" element = {<Auth/>}/>
          <Route path = "/home" element = {<Home/>}/>
        </Routes> 
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
