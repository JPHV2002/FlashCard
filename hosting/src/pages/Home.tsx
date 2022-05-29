import { useAuth } from "../hooks/useAuth"
import { useNavigate } from 'react-router-dom'

import { useState, useContext, useEffect } from "react";
import { DeckList } from "../components/DeckList";

import '../styles/home.scss'
import { FlashcardList } from "../components/FlashcardList";
import { DeckContext } from "../contexts/DeckContext";
import { Button } from "../components/Button";

export function Home(){
    const { user } = useAuth();
    const navigate = useNavigate();
    const [currentDeck, setCurrentDeck] = useState<number>(-1);
    const {setDeck} = useContext(DeckContext);

    const changeCurrentDeck = (id: number) => {
        setCurrentDeck(id);
    }

    function handleNavigateToStudyRoom(){
        navigate('/study');
    }

    useEffect(() => {
        setDeck(currentDeck)
    }, [currentDeck])
    
    return(
        <div id = "page-home">
            <header>
                <div id="title">
                    <h1 id="card">
                        <span id="flash">FLASH</span>
                    CARD</h1>
                </div>
                <div id = "user-id">
                    <label>{user?.name}</label>
                    <img src={user?.avatar} alt="User avatar"/>
                </div>
            </header>
            <aside>
                <h2>Seus Decks</h2>
                <DeckList currentDeck = {currentDeck} changeDeck={changeCurrentDeck}/>
            </aside>
            <main>
                {currentDeck !== -1?<FlashcardList deckId = {currentDeck}/>:<></>}
                <div id = "btn">
                    {currentDeck !== -1?<Button onClick = {handleNavigateToStudyRoom}>Iniciar Estudo</Button>: <></>}
                </div>
            </main>
        </div>
    );
}