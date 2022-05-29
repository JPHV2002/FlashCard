import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import {EditableLabel} from "./EditableLabel";

import api from "../services/api";

import addIcon from "../assets/images/addIcon.svg";
import deleteIcon from "../assets/images/deleteIcon.svg";
import openIcon from "../assets/images/openIcon.svg";

import '../styles/deckList.scss';

type DeckProps = {
    id: number;
    value: string;
    flashcardNumber: number;
}

type DeckListProps = {
    currentDeck: number
    changeDeck: (id: number) => void
}
export function DeckList(props: DeckListProps){
    const { user } = useAuth();
    const [list, setList] = useState<DeckProps[]>([]);
    const [count, setCount] = useState(0);
    const [idList, setIdList] = useState<number[]>([]);

    useEffect(() => {
        const userId = user?.id || " "
        api.post("/getDecksNames", {
            userId: userId
        }).then((response) => {
            setList([]);
            setCount(0);
            setIdList([]);
            for(let i = 0; i < response.data.length; i++){
                const newDeck = {
                    id: response.data[i].deckId,
                    value: response.data[i].deckName,
                    flashcardNumber: 0
                }
                setIdList(idList => [...idList, response.data[i].deckId]);
                
                setCount(count+1);
                
                setList(list => [...list, newDeck]);
                
            }
        })
      }, [user]);
      
    
    function handleAddDeck(){
        setCount(0)
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
        //setCount(count+1);
        setList(list => [...list, newDeck]);
        setIdList(idList => [...idList, newDeck.id]);
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
        setIdList(idList => idList.filter(id_ => id_ !== id))
        api.delete("/deck", {
            data:{
            userId: user?.id,
            deckId: id.toString()
        }
        }).catch(error => {
            console.log(error.response)
        })
        if(id == props.currentDeck) props.changeDeck(-1);
    }

    return(
        <div id = "deckList">
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
                    <div>
                        <button onClick = {function (){props.changeDeck(item.id)}}><img src={openIcon} alt = "open icon"/></button>
                        <button onClick = {function (){handleDeleteDeck(item.id)} }><img src={deleteIcon} alt = "edit icon"/></button>
                    </div>
                </div>
            ))}
            {list.length < 22 ? <button onClick={() => handleAddDeck()}><img src={addIcon} alt = "edit icon"/></button> : <></>}
        </div>
    );
}