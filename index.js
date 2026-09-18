const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// App se aane wale data aur connection ke liye (CORS)
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// YAHAN APNI SECRET API KEY DAALEIN
const KLING_API_KEY = 'api-key-kling-SnE09voxUlsamcBwJa'; // Agar aapne nayi key banayi hai toh yahan badal dein

// Check karne ke liye route
app.get('/', (req, res) => {
  res.send('VideoMind Backend is live and AI is ready!');
});

// Video banane ki request handle karne ka route
app.post('/*', async (req, res) => {
  try {
    const response = await fetch('https://api.klingai.com' + req.path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KLING_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



