import { useAuth } from "../hooks/useAuth"

import { useEffect, useState } from "react";
import { DeckList } from "../components/DeckList";
import api from "../services/api";

import '../styles/home.scss'

export function Home(){
    const { user } = useAuth();
    const [collection, setCollection] = useState([]);

    /*POST
    useEffect(() => {
        api.post("/createFlashCard", {
            userId: "123",
	        deck: "deck_1",
	        flashCardId: "excudo",
            term: "espada",
	        definition: "SOU ESPADA MEU IRMÃO"
        })
        .then(response => {
            console.log(response)
        })
    })*/

    /** GET
     * api.post("/flashcard", {
            userId: "123",
	        deck: "deck_1",
	        flashCardId: "excudo",
        })
     * 
     */

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
                <DeckList/>
            </aside>
            <main>

            </main>
        </div>
    );
}