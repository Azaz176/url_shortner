import express from 'express';
const router = express.Router();
import { URL } from '../models/url.models.js';
import { handleGenerateNewShortURL } from '../controllers/url.controllers.js';

router
  .post('/', handleGenerateNewShortURL)
  .get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    console.log(`Received shortId: ${shortId}`); // Debug log

    try {
      const entry = await URL.findOneAndUpdate(
        { shortId },
        {
          $push: {
            visitHistory: {
              timestamp: Date.now()
            }
          }
        },
        { new: true } // This ensures that the updated document is returned
      );

      if (!entry) {
        console.log(`ShortId not found: ${shortId}`); // Debug log
        return res.status(404).json({ error: "Short URL not found" });
      }

      console.log(`Redirecting to: ${entry.redirectURL}`); // Debug log
      res.redirect(entry.redirectURL);
    } catch (error) {
      console.error(`Error occurred: ${error.message}`); // Debug log
      res.status(500).json({ error: error.message });
    }
  });

export default router;
