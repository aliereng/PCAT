const mongoose = require('mongoose');

async function connectDatabase() {
  try {
    await mongoose.connect(
      'mongodb+srv://<username>:<password>@cluster0.o1smq.mongodb.net/pcat?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("veritabanı bağlantısı başarılı");
  } catch (err) {
    console.log('veritabanı bağlantısı başarısız. error: ' + err);
  }
}
module.exports = { connectDatabase };
