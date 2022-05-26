import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"
import {EditableLabel} from "./EditableLabel"

import api from "../services/api";

import addIcon from "../assets/images/addIcon.svg"
import deleteIcon from "../assets/images/deleteIcon.svg"

import '../styles/collectionList.scss';

type DeckProps = {
    id: number;
    value: string;
    flashcardNumber: number;
}

export function DeckList(){
    const { user } = useAuth();
    const [list, setList] = useState<DeckProps[]>([]);
    const [count, setCount] = useState(0);
    const [idList, setIdList] = useState<Number[]>([]);

    useEffect(() => {
        const userId = user?.id || " "
        api.post("/getDecksNames", {
            userId: userId
        }).then((response) => {
            console.log(response.data);
            setList([]);
            setCount(0);
            setIdList([]);
            for(let i = 0; i < response.data.length; i++){
                const newDeck = {
                    id: response.data[i].deckId,
                    value: response.data[i].deckName,
                    flashcardNumber: 0
                }
                setCount(count+1);
                setIdList(idList => [...idList, response.data[i].deckId]);
                setList(list => [...list, newDeck]);
                console.log(list)
            }
        })
      }, [user]);
    
    function handleAddDeck(){
        while(idList.includes(count)){
            setCount(count+1);
        }
        const newDeck = {
            id: count,
            value: 'Novo Deck',
            flashcardNumber: 0
        }
        api.post("/createDeck", {
            userId: user?.id,
            deckName: newDeck.value,
            deckId: newDeck.id.toString()
        }).catch(error => {
            console.log(error.response)
        })
        setCount(count+1);
        setList(list => [...list, newDeck]);
    }

    function handleChangeDeck(value: string, id:number){
        setList(list => list.map(deck => deck.id === id? {...deck, value}: deck))
        api.put("/deck", {
            //data:{
            userId: user?.id,
            deckName: value,
            deckId: id.toString()//}
        }).catch(error => {
            console.log(error.response)
        })
    }

    function handleDeleteDeck(id: number){
        setList(list => list.filter(deck => deck.id !== id))
        api.delete("/deck", {
            data:{
            userId: user?.id,
            deckId: id.toString()
        }
        }).catch(error => {
            console.log(error.response)
        })
    }

    return(
        <div id = "list">
            {list.map(item => (
                <div key = {item.id} className = "item">
                <EditableLabel type = "input" text = {item.value}>
                <input
                    autoFocus
                    maxLength= {20}
                    type="text"
                    name="task"
                    placeholder="Nome do Deck"
                    value={item.value}
                    onChange={e => handleChangeDeck(e.target.value, item.id)}/>
                </EditableLabel>
                <button onClick = {() => handleDeleteDeck(item.id)}><img src={deleteIcon} alt = "edit icon"/></button>
                </div>
            ))}
            {list.length < 22 ? <button onClick={() => handleAddDeck()}><img src={addIcon} alt = "edit icon"/></button> : <></>}
            
        </div>
    );
}