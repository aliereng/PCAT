const express = require('express');
const path = require('path');
const port = 3000;
const app = express();
app.use(express.static('public'));
app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'index/contact.html'));
});

app.listen(port, () => {
  console.log(`sunucu ${port} portunda başlatıldı`);
});
