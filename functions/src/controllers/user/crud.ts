import {Request, Response} from "express";
import { getFirestore } from "../../services/firebase";

import { createUserParms } from "./user";

export async function createUser(req:Request, res:Response) {
    const parms: createUserParms = {
        userId: req.body.userId
    } 

    const deckInfo = {
        deckId: 'First Deck',
        deckName: 'First Deck'
    }

    try {
        await getFirestore().collection(parms.userId).doc(deckInfo.deckId).set(deckInfo)
        return res.status(200).json({
            response: "User Created",
            data: parms.userId
        })
    } catch (error) {
        return res.status(400).json(error)
    }
}

export async function getAllDecks(req:Request, res:Response) {
    const parms: createUserParms = {
        userId: req.body.userId
    } 

    try{
        const data = await getFirestore().collection(parms.userId).get()
        const decks = await data.docs.map(doc => {
            return {
                deckName: doc.data().deckName,
                deckIds: doc.data().deckId
            }})
        return res.status(200).json(decks)
    }catch (error) {
        return res.status(400).json(error)
    }
}