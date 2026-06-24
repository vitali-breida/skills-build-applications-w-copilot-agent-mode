const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB:', mongoUri);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', port, database: 'octofit_db', baseUrl });
});

app.get('/', (req, res) => {
  res.send('OctoFit Tracker API is running.');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
