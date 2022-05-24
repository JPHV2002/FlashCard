import { useAuth } from "../hooks/useAuth"

import { useEffect } from "react";

import '../styles/home.scss'

//import '../services/api'
import api from "../services/api";

export function Home(){
    const { user } = useAuth();

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
    })

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

            </aside>
            <main>

            </main>
        </div>
    );
}