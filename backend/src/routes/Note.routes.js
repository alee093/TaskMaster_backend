import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import { createNote, getArchived, getAll, getById, updateNote, archiveNote, unarchiveNote, deleteNote } from '../controllers/notes.controllers.js'

const router = express.Router()

router.use(authMiddleware) 

router.post('/', createNote)
router.get('/archived', getArchived) 
router.get('/', getAll)
router.get('/:id', getById) 
router.put('/:id', updateNote)
router.patch('/:id/archive', archiveNote)
router.patch('/:id/unarchive', unarchiveNote)
router.delete('/:id', deleteNote)


export default router
