import { Router } from 'express'
import * as roomController from '../controllers/roomController.js'

const router = Router()

router.route('/').get((req, res) => res.render('index'))
router.route('/lobby/:roomId').get((req, res) => res.render('lobby', { roomId: req.params.roomId }))
router.route('/room/:roomId').get(roomController.get)
router.route('/room').post(roomController.post)

export default router