import { KeyboardEvent, useState } from "react";
import { ReactNode } from 'react';

//import '../styles/label.scss';

type EditableLabelProps = {
    text: string;
    type: string;
    children:ReactNode;
}

export function EditableLabel(props: EditableLabelProps){
    const [isEditing, setEditing] = useState(false);

    function handleKeyDown(e: KeyboardEvent<HTMLDivElement>){
        if(e.key === "Enter"){
            setEditing(false);
        }
    }

    return(
        <div {...props}>
             {isEditing?(
                <div onBlur={() => setEditing(false)} onKeyDown={(e) => handleKeyDown(e)}
                >
                    {props.children}
                </div>
            ):(
                <div onClick={() => {setEditing(true)}}>
                    <label>
                        {props.text || "Novo Deck"}
                    </label>
                </div>
            )}
    
        </div>
    );
}