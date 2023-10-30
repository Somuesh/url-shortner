import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
// import { validateUrl } from '../utils/utils.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' });

const router = express.Router();

// Short URL Generator
router.post('/short', async (req, res) => {
  const { origUrl } = req.body;
  const base = process.env.BASE;

  const urlId = nanoid(8);
  if ((origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        // console.log(url)
        res.json(url.shortUrl);
      } else {
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json(url.shortUrl);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(400).json('Invalid Original Url');
  }
});

export default router;