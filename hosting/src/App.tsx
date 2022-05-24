import { BrowserRouter, Routes,Route } from 'react-router-dom';

import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { StudyRoom } from './pages/StudyRoom';

import { AuthContextProvider } from './contexts/AuthContext'


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path = "/" element = {<Auth/>}/>
          <Route path = "/home" element = {<Home/>}/>
          <Route path = "/study" element = {<StudyRoom/>}/>
        </Routes> 
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
