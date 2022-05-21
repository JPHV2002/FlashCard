export type createFlashcardParams = {
    userId: string,
    deck: string,
    flashCardId: string,
    term: string,
    definition: string
}

export type getFlashcardParams = {
    userId: string,
    deck: string,
    flashCardId: string,
}

export type flashcardData = {
    term: string,
    definition: string
}