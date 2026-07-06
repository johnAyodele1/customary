import { Request, Response } from 'express';
import { uploadImage } from '../shared/cloudinary.js';

export const upload = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No file uploaded' });
    }

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const url = await uploadImage(dataURI);
    res.json({ status: 'success', data: { url } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Upload failed' });
  }
};
