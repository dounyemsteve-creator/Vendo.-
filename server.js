// server.js
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// You will get your key from OpenAI dashboard
const OPENAI_API_KEY = 'YOUR_SECRET_KEY_HERE'; 

app.post('/generate-ad', async (req, res) => {
  const { productName, productDescription } = req.body;

  const prompt = `You are Venda-chan, the energetic TikTok star for VENDO. 
  Write a 30-second ad script for ${productName}. 
  Description: ${productDescription}. 
  Use Gen-Z slang, be energetic, and end with "Lux is now available with VENDO!".`;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` }
    });

    res.json({ script: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).send("Error generating ad");
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```
