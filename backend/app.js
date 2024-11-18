const express = require('express');
const bodyParser = require('body-parser');
const itemsRouter = require('./routes/items');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Routen
app.use('/api/items', itemsRouter);

// Starten des Servers
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
