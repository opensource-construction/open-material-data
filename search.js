const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '.')));

app.get('/get-files', (req, res) => {
  const materialsPath = path.join(__dirname, 'Materials');
  fs.readdir(materialsPath, (err, files) => {
    if (err) {
      res.status(500).send('Error reading the Materials folder');
      return;
    }
    res.json(files);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
