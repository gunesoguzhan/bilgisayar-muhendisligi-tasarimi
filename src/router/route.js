import { Router } from 'express'
import * as roomController from '../controllers/roomController.js'
import * as lobbyController from '../controllers/lobbyController.js'
import * as crypto from 'crypto'

const router = Router()

router.route('/').get((req, res) => res.redirect(`/room/${crypto.randomUUID()}`))
router.route('/room/:roomId').get(roomController.get)
router.route('/lobby/:roomId').get(lobbyController.get)
router.route('/lobby/:roomId').post(lobbyController.post)

export default router