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
    const {setDeck, setDeckSize, deckSize } = useContext(DeckContext);
    const [currentDeckSize, setCurrentDeckSize] = useState<number>(deckSize);

    const changeCurrentDeck = (id: number) => {
        setCurrentDeck(id);
    }

    const changeCurrentDeckSize = (size: number) => {
        setCurrentDeckSize(size);
    }

    function handleNavigateToStudyRoom(){
        navigate('/study');
    }

    useEffect(() => {
        setDeck(currentDeck)
    }, [currentDeck])

    useEffect(() => {
        setDeckSize(currentDeckSize)
    }, [currentDeckSize])
    
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
                <DeckList currentDeck = {currentDeck} changeDeck={changeCurrentDeck} />
            </aside>
            <main>
                {currentDeck !== -1?<FlashcardList  deckSize = {currentDeckSize} changeDeckSize= {changeCurrentDeckSize} deckId = {currentDeck}/>:<></>}
                <div id = "btn">
                    {currentDeck !== -1 && currentDeckSize >=10?<Button onClick = {handleNavigateToStudyRoom}>Iniciar Estudo</Button>: <></>}
                </div>
            </main>
        </div>
    );
}