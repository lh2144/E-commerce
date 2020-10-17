import express from 'express';
import { createComment, getCommentsById } from '../controllers/comment';
const router = express.Router();

router.post('/createComment', createComment);
router.get('/comment/:id', getCommentsById);

export default router;
