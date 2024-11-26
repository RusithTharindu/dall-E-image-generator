import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// GET request to test the route
// router.route('/').get((req, res) => {
//   res.status(200).json({ message: 'Hello from DALL-E!' });
// });

// // POST request to generate an image
// router.route('/').post(async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const aiResponse = await openai.images.generate({
//       model: 'dall-e-3', // Specify the model (optional, but recommended for DALL-E 3)
//       prompt,
//       n: 1,
//       size: '1024x1024',
//       response_format: 'b64_json',
//     });

//     const image = aiResponse.data[0].b64_json; // Access the first image
//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error?.response.data.error.message);
//   }
// });
router.route('/').post(async (req, res) => {
    try {
      const { prompt } = req.body;
  
      const aiResponse = await openai.images.generate({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      });
  
      const image = aiResponse.data[0].b64_json;
      res.status(200).json({ photo: image });
    } catch (error) {
      console.error(error);
  
      // Handle billing error specifically
      if (error.code === 'billing_hard_limit_reached') {
        res.status(402).json({ error: 'Billing limit reached. Please check your OpenAI account.' });
      } else {
        res.status(500).json({ error: error?.message || 'Something went wrong' });
      }
    }
  });

export default router;
