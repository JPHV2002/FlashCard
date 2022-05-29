import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { StudyRoom } from './pages/StudyRoom';

import { AuthContextProvider } from './contexts/AuthContext'
import { DeckContext } from './contexts/DeckContext'
import { useState } from 'react';


function App() {
  const [deck, setDeck] = useState<number>(-1)

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <DeckContext.Provider value={{ deck, setDeck }}>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/study" element={<StudyRoom />}/>
          </Routes>
        </DeckContext.Provider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
