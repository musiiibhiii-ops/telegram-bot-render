const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const PORT = process.env.PORT || 3000;

app.post('/webhook', (req, res) => {
  const upd = req.body;
  console.log('update:', JSON.stringify(upd));

  if (upd.message && upd.message.chat && upd.message.text) {
    const chatId = upd.message.chat.id;
    const text = `پیام دریافت شد: ${upd.message.text}`;

    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({chat_id: chatId, text})
    }).catch(err => console.error('sendMessage error:', err));
  }

  res.sendStatus(200);
});

app.get('/', (req, res) => res.send('ok'));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
