import {createContext} from 'react'

type DeckContextType = { 
    deck: number, 
    setDeck: React.Dispatch<React.SetStateAction<number>> }

export const DeckContext = createContext(null as unknown as DeckContextType)