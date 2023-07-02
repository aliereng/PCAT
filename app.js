const express = require('express');

const port = 3000;
const app = express();
//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(express.static('public'));

//ROUTES
app.get('/', (req, res, next) => {
  res.render('index');
});
app.get('/about', (req, res, next) => {
    res.render('about');
  });
  app.get('/add', (req, res, next) => {
    res.render('add');
  });

app.listen(port, () => {
  console.log(`sunucu ${port} portunda başlatıldı`);
});
