import {Request, Response} from "express";
import { getFirestore } from "../services/firebase";

import app from '../services/firebase/client'


export async function getFlashcard(req:Request, res:Response){

    const flashCardData = {
        userId: req.body.userId,
        deck: req.body.deck,
        flashCardId: req.body.flashCardId
    }

    const flashCardTerm = await getFirestore().collection(flashCardData.userId).doc('decks').collection(flashCardData.deck).doc(flashCardData.flashCardId).get()
    if(flashCardTerm.exists){
        let data = flashCardTerm.data()
        if(data){
            return res.status(200).json({
                term: data.term,
                definition: data.definitoin
            })
        }
    }
    return res.status(400).json({})
}  