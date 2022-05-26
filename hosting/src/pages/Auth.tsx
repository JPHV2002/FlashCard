import { useNavigate } from 'react-router-dom'

import {Button} from '../components/Button'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'

import { useAuth } from "../hooks/useAuth"

export function Auth(){
    const navigate = useNavigate();
    const {user,signInWithGoogle } = useAuth()

    async function handleNavigateToHome(){
        if (!user){
            await signInWithGoogle();
        }
        
        navigate('/home');
    }
    return(
        <div id="page-auth">
            <aside>
                <div id="title">
                    <h1 id="card">
                        <span id="flash">FLASH</span>
                    CARD</h1>
                </div>
                <p>Crie, estude e compartilhe seus flashcards</p>
            </aside>
            <main>
                <div className="main-content">
                    <button className="login-google" onClick = {handleNavigateToHome}>
                        <img src={googleIconImg} alt="Logo do Google"/>
                        Faça login com o Google
                    </button>
                    <div className="separator">ou faça login com seu email</div>
                    <form>   
                        <input 
                            type="email"
                            placeholder="Digite seu email"
                        />
                        <input 
                            type="password"
                            placeholder="Digite sua senha"
                        />  
                        <Button type="submit">Entrar</Button>
                    </form>
                    <p>Não possui cadastro?</p>
                    <a href="#"> Crie uma nova conta</a>
                </div>
            </main>
        </div>
    );
}