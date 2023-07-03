const express = require('express');
const { connectDatabase } = require('./helpers/databaseHelper/dbHelpers');
const Photo = require("./models/Photo");

const port = 3000;
const app = express();
//CONNECT DB
connectDatabase();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
//ROUTES
app.get('/', async (req, res, next) => {
  const photos = await Photo.find();
  res.render('index',{
    photos
  });
});
app.get('/about', (req, res, next) => {
  res.render('about');
});
app.get('/add', (req, res, next) => {
  res.render('add');
});
app.post('/photos', async (req, res, next) => {
  await Photo.create(req.body);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`sunucu ${port} portunda başlatıldı`);
});
