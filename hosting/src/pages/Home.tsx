import { useAuth } from "../hooks/useAuth"

import '../styles/home.scss'

export function Home(){
    const { user } = useAuth();

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