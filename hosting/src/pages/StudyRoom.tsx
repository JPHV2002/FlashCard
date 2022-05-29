import { useAuth } from "../hooks/useAuth"
import { useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from "react";
import { DeckContext } from "../contexts/DeckContext";

import api from "../services/api";

import cardIcon from "../assets/images/cardIcon.svg"
import arrowIcon from "../assets/images/arrowIcon.svg"
import arrowLeftIcon from "../assets/images/arrowLeftIcon.svg"
import flipIcon from "../assets/images/flipIcon.svg"
import '../styles/studyRoom.scss'

type FlashcardProps = {
    id: string;
    term: string;
    definition: string;
    isFlipped: boolean;
    isMarked: boolean;
    isCorrect: boolean;
} | undefined

export function StudyRoom() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { deck } = useContext(DeckContext)
    const [count, setCount] = useState<number>(0)
    const [list, setList] = useState<FlashcardProps[]>([]);
    //const [currentFlashcard, setCurrentFlashcard] = useState<FlashcardProps>();



    useEffect(() => {
        const userId = user?.id || ""
        if (deck !== -1) {
            api.post("/getDeck", {
                userId: userId,
                deckId: deck.toString()
            }).then((response) => {
                setList([]);
                for (let i = 0; i < response.data.flashCards.length; i++) {
                    const newFlashcard = {
                        id: response.data.flashCards[i].term,
                        term: response.data.flashCards[i].term,
                        definition: response.data.flashCards[i].definition,
                        isFlipped: false,
                        isMarked: false,
                        isCorrect: false
                    }
                    setList(list => [...list, newFlashcard]);
                    //setCurrentFlashcard(list[0])
                }
            })
        }
    }, []);

    function flipCard() {
        const flashcard = list[count]
        if (flashcard) {
            setList(list => list.map(card => card?.id === list[count]?.id ? {
                id: flashcard.id,
                term: flashcard.term,
                definition: flashcard.definition,
                isFlipped: !flashcard.isFlipped,
                isMarked: true,
                isCorrect: flashcard.isCorrect
            } : card))
        }
    }

    function handleGoToNextFlashcard() {
        if (list[count + 1]) setCount(count + 1)
    }

    function handleGoToPreviousFlashcard() {
        if (count > 0) setCount(count - 1)
    }
    return (
        <div>
            {deck == -1 ? <h1>Sessão indisponível</h1> :
                <div id="page-study">
                    <header>
                        <h2>{count + 1}/{list.length}</h2>
                    </header>
                    <main>

                        <img onClick={handleGoToPreviousFlashcard} className="arrow-left" src={arrowLeftIcon} alt="" />

                        <div id="flashcard-study">
                            <div id="card-text">
                                {list[count]?.isFlipped ?
                                    <div id="card-front">
                                        <span>Definição</span>
                                        <p>{list[count]?.definition}</p>
                                    </div>
                                    :
                                    <div id="card-back">
                                        <span>Termo</span>
                                        <p>{list[count]?.term}</p>
                                    </div>
                                }
                            </div>

                            <img src={cardIcon} alt="flashcard icon" />
                        </div>
                        <img onClick={handleGoToNextFlashcard} src={arrowIcon} alt="" />

                    </main>
                    <footer>
                        <img id="flip-btn" src={flipIcon} alt="" onClick={flipCard} />
                        <p>Acertos:</p>
                        <p id="miss">Erros:</p>
                    </footer>
                </div>
            }
        </div>
    );
}