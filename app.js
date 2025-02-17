const express = require("express")
const app = express()

require('dotenv').config()
const axios = require('axios');

app.use(express.json());

app.post('/openai', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await axios.post(
    `https://${process.env.OPENAI_SERVICE}.openai.azure.com/openai/deployments/${process.env.OPENAI_NAME}/chat/completions?api-version=${process.env.OPENAI_VERSION}`,
      {
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ],
        "temperature": 0.7,
        "top_p": 0.95,
        "max_tokens": 800
      },
      {
        headers: {
          'api-key': process.env.OPENAI_API_KEY
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al conectarse con la API de OpenAI');
  }
});

module.exports = app