import {Request, Response} from "express";
import { getFirestore } from "../../services/firebase";

import { createFlashcardParams, flashcardData, getFlashcardParams } from './flashcard'

export async function createFlashCard(req:Request, res:Response){
    const userData: createFlashcardParams = {
        userId: req.body.userId,
        deck: req.body.deck,
        flashCardId: req.body.flashCardId,
        term: req.body.term,
        definition: req.body.definition
    }

    const flashcard: flashcardData = {
        term: userData.term,
        definition: userData.definition
    }

    try {
        await getFirestore().collection(userData.userId).doc(userData.deck).collection('Flashcard').doc(userData.flashCardId).set(flashcard)
        return res.status(200).json({
            response: "Data created",
            data: flashcard
        })
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function getFlashCard(req:Request, res:Response) {
    const parms: getFlashcardParams = {
        userId: req.body.userId,
        deck: req.body.deck,
        flashCardId: req.body.flashCardId,
    }

    try {
        const data = await getFirestore().collection(parms.userId).doc(parms.deck).collection('Flashcard').doc(parms.flashCardId).get()
        if(data.exists){
            const flashcard= data.data()
            return res.status(200).json({data: flashcard})
        }else{
            return res.status(404).json({error: "Data not found"})
        }
    } catch (error) {
        return res.status(400).json(error)
    }
}