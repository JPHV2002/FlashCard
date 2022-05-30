import {Request, Response} from "express";
import { getFirestore } from "../../services/firebase";
import { DeckInfo, DeckParms, deckUpdate, getDeckParms } from "./deck";


export async function createDeck(req:Request, res:Response) {
    const parms:DeckParms = {
        userId: req.body.userId,
        deckName: req.body.deckName,
        deckId: req.body.deckId
    }

    const deckInfo: DeckInfo = {
        deckName: parms.deckName,
        deckId: parms.deckId
    }

    try {
        await getFirestore().collection(parms.userId).doc(parms.deckId).set(deckInfo)
        return res.status(200).json(deckInfo)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function getDeck(req:Request, res:Response) {
    const parms:getDeckParms = {
        userId: req.body.userId,
        deckId: req.body.deckId
    }

    try{
        const data = await getFirestore().collection(parms.userId).doc(parms.deckId).collection('Flashcard').get()
        const flashCards = await data.docs.map(doc => {return doc.data()})
        return res.status(200).json({
            flashCards
        })
    }catch(error){
        return res.status(400).json(error)
    }
}

export async function deleteDeck(req:Request, res:Response) {
    const parms:getDeckParms = {
        userId: req.body.userId,
        deckId: req.body.deckId
    }

    try {
        const data = await getFirestore().collection(parms.userId).doc(parms.deckId).collection('Flashcard').get()
        const flashCards = await data.docs.map(doc => {
            const flashcardId = doc.data().flashCardId
            getFirestore().collection(parms.userId).doc(parms.deckId).collection('Flashcard').doc(flashcardId).delete()
        })
        await getFirestore().collection(parms.userId).doc(parms.deckId).delete()
        return res.status(200).json({
            status: 200,
            data: "data deleted"
        })
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function updateDeckInfo(req:Request, res:Response) {
    const parms:DeckParms = {
        userId: req.body.userId,
        deckName: req.body.deckName,
        deckId: req.body.deckId
    }

    const deckInfo: deckUpdate = {
        deckName: parms.deckName,
    }

    try {
        await getFirestore().collection(parms.userId).doc(parms.deckId).update(deckInfo)
        return res.status(200).json(deckInfo)
    } catch (error) {
        return res.status(400).json(error)
    }
}