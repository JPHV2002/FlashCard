import {Button} from '../components/Button'

import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'

export function Home(){
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
                    <button className="login-google">
                        <img src={googleIconImg} alt="Logo do Google"/>
                        Faça login o Google
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
                    <a href=""> Crie uma nova conta</a>
                </div>
            </main>
        </div>
    );
}