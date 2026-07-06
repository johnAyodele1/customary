import { Router } from 'express';
import multer from 'multer';
import * as mediaController from './media.controller.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('image'), mediaController.upload);

export default router;
