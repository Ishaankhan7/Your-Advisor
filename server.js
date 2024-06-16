const express = require('express');
const app = express();
const { run } = require('./app');

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname, {
    setHeaders: (res, path) => {
      if (path.endsWith('.jpg')) {
        res.setHeader('Content-Type', 'beach-sunset.jpg');
      }
    }
  }));

  let userCount = 0;

  app.post('/api/advice', async (req, res) => {
    const { book, problem, name } = req.body;
    try {
      userCount++;
      const result = await run(book, problem);
      console.log(`API call made by ${name},Problem: ${problem}`); 
      console.log(`Total users: ${userCount}`);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Reload the page..');
    }
  });

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
