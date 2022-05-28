import { useAuth } from "../hooks/useAuth"

import { useState } from "react";
import { DeckList } from "../components/DeckList";

import '../styles/home.scss'
import { FlashcardList } from "../components/FlashcardList";

export function Home(){
    const { user } = useAuth();
    const [currentDeck, setCurrentDeck] = useState<number>(-1);

    const changeCurrentDeck = (id: number) => {
        setCurrentDeck(id)
        console.log("Deck selecionado: " + currentDeck)
    }
    
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
            </main>
        </div>
    );
}