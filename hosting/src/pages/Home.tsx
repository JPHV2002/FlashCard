import { useAuth } from "../hooks/useAuth"

import { useEffect, useState } from "react";
import { DeckList } from "../components/DeckList";
import api from "../services/api";

import '../styles/home.scss'

export function Home(){
    const { user } = useAuth();
    const [currentDeck, setCurrentDeck] = useState<number>();

    const changeCurrentDeck = (id: number) => {
        setCurrentDeck(id)
        console.log(currentDeck)
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
                <DeckList changeDeck={changeCurrentDeck}/>
            </aside>
            <main>
                <h2>Main</h2>
            </main>
        </div>
    );
}