import { Router } from 'express'

import{
    createFlashCard,
    getFlashCard,
} from './controllers/FlashCard/crud'

const router = Router()

router.post('/flashcard', getFlashCard)
router.post('/createFlashCard', createFlashCard)

export default router