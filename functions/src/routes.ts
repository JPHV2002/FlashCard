import { Router } from 'express'

import{
    creatFlashCard
} from './controllers/AdminController'

const router = Router()

router.get('/',creatFlashCard )

export default router