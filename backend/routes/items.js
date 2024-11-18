const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/items.json');

// Helper-Funktion zum Laden und Speichern von Daten
function getItems() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

function saveItems(items) {
  fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));
}

// GET: Alle Items anzeigen
router.get('/', (req, res) => {
  const items = getItems();
  res.json(items);
});

// POST: Neues Item hinzufügen
router.post('/', (req, res) => {
  const items = getItems();
  const newItem = req.body;
  items.push(newItem);
  saveItems(items);
  res.status(201).json(newItem);
});

// PUT: Ein Item aktualisieren
router.put('/:id', (req, res) => {
  const items = getItems();
  const itemIndex = items.findIndex(item => item.id === parseInt(req.params.id));
  if (itemIndex !== -1) {
    items[itemIndex] = req.body;
    saveItems(items);
    res.json(items[itemIndex]);
  } else {
    res.status(404).send('Item nicht gefunden');
  }
});

// DELETE: Ein Item löschen
router.delete('/:id', (req, res) => {
  const items = getItems();
  const updatedItems = items.filter(item => item.id !== parseInt(req.params.id));
  saveItems(updatedItems);
  res.status(204).send();
});

module.exports = router;
