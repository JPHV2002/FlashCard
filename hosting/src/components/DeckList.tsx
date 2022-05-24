import { useState } from "react";
import {EditableLabel} from "./EditableLabel"

import addIcon from "../assets/images/addIcon.svg"
import deleteIcon from "../assets/images/deleteIcon.svg"

import '../styles/collectionList.scss';

type DeckProps = {
    id: number;
    value: string;
    flashcardNumber: number;
}

export function DeckList(){
    const [list, setList] = useState<DeckProps[]>([]);
    const [count, setCount] = useState(1);
    
    function handleAddItem(){
        const newItem = {
            id: count,
            value: 'Novo Deck',
            flashcardNumber: 0
        }
        setCount(count+1);
        setList(list => [...list, newItem]);
        console.log(list)
    }

    function handleChangeItem(value: string, id:number){
        setList(list => list.map(item => item.id === id? {...item, value}: item))
        
    }

    function handleDeleteItem(id: number){
        setList(list => list.filter(item => item.id !== id))
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
                    onChange={e => handleChangeItem(e.target.value, item.id)}/>
                </EditableLabel>
                <button onClick = {() => handleDeleteItem(item.id)}><img src={deleteIcon} alt = "edit icon"/></button>
                </div>
            ))}
            {list.length < 22 ? <button onClick={() => handleAddItem()}><img src={addIcon} alt = "edit icon"/></button> : <></>}
            
        </div>
    );
}