const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const { connectDatabase } = require('./helpers/databaseHelper/dbHelpers');
const Photo = require('./models/Photo');

const port = 3000;
const app = express();
//CONNECT DB
connectDatabase();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

//ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find();
  res.render('index', {
    photos,
  });
});
app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});
app.get('/about', (req, res, next) => {
  res.render('about');
});
app.get('/add', (req, res, next) => {
  res.render('add');
});
app.post('/photos', async (req, res, next) => {
  let sampleFile;
  let uploadPath;
  const uploadDir = 'public/img/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  req.files.image.name = req.files.image.md5 + "." + req.files.image.name.split(".")[1];

  sampleFile = req.files.image;
  uploadPath = __dirname + '/public/img/uploads/' + sampleFile.name;
  req.body.image = sampleFile.name;
  sampleFile.mv(uploadPath, async function(err) {
    if (err)
      return res.status(500).send(err);

      await Photo.create(req.body);
      res.redirect('/');
  });
  
});

app.listen(port, () => {
  console.log(`sunucu ${port} portunda başlatıldı`);
});
