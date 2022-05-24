import { useAuth } from "../hooks/useAuth"

import { useEffect } from "react";

import '../styles/home.scss'

//import '../services/api'
import api from "../services/api";

export function Home(){
    const { user } = useAuth();

    useEffect(() => {
        api.get("/flashcard", {params:{
            userId: '1',
            deck: 'deck_1',
            flashCardId: 'flashcard1' 
        }})
        .then(response => {
            console.log(response)
        })
    })

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