const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

function validateNumbers(req, res, next) {
  const { num1, num2 } = req.body;
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'Invalid input: num1 and num2 must be numbers.' });
  }
  next();
}

app.post('/add', validateNumbers, (req, res) => {
  const { num1, num2 } = req.body;
  res.json({ result: num1 + num2 });
});

app.post('/subtract', validateNumbers, (req, res) => {
  const { num1, num2 } = req.body;
  res.json({ result: num1 - num2 });
});

app.post('/multiply', validateNumbers, (req, res) => {
  const { num1, num2 } = req.body;
  res.json({ result: num1 * num2 });
});

app.post('/divide', validateNumbers, (req, res) => {
  const { num1, num2 } = req.body;
  if (num2 === 0) {
    return res.status(400).json({ error: 'Cannot divide by zero.' });
  }
  res.json({ result: num1 / num2 });
});

app.listen(port, () => {
  console.log(`Calculator microservice running on http://localhost:${port}`);
});
