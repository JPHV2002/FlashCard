import { Router } from 'express'

import{
    createFlashCard,
    getFlashCard
} from './controllers/FlashCard/crud'

const router = Router()

router.get('/flashcard', getFlashCard)
router.post('/flashcard', createFlashCard)

export default router