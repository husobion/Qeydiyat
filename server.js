const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const BOT_TOKEN = '7755982405:AAFFlliDueGtsySM5qfihTq2QY-yokBJD04';
const TELEGRAM_CHAT_ID = '6860797750';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/submit', async (req, res) => {
  const { ad, soyad, telefon, email } = req.body;
  const mesaj = `📥 Yeni Batumi Tur Qeydiyyatı:
👤 Ad: ${ad}
👥 Soyad: ${soyad}
📞 Telefon: ${telefon}
📧 Gmail: ${email}`;

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: mesaj,
    });
    res.sendFile(path.join(__dirname, '/public/success.html'));
  } catch (e) {
    console.error('Telegram göndərmə xətası:', e);
    res.sendFile(path.join(__dirname, '/public/error.html'));
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(port, () => console.log(`Server işə düşdü...`));