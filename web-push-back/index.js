const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const webpush = require('web-push')
const { CronJob } = require('cron');
const send = require('./send');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ subscriptions: [] })
  .write()
const app = express()

dotenv.config()

app.use(cors())
app.use(bodyParser.json())

webpush.setVapidDetails("mailto: florian.chevallier03@gmail.com", 'BA13aNs9a9ALPCh2GARkwJ5JJ-fXdvaeo06Q7Du9TsxLvXZT3D19au-onAdpn61340Ey1F3aPsuVTAHEGaxeSZo', 'N70q2-pQYU0qUcXSlVKOsOJHcerIE_xtMlgQZEqD5Nw')

app.post('/api/notifications/subscribe', (req, res) => {
  const subscription = req.body
  db.get('subscriptions')
    .push(subscription)
    .write();


  const payload = JSON.stringify({
    title: "Merci d'avoir setup les notifications",
    body: `On recevra une notif dès que nécessaire :)`,
  })

  webpush.sendNotification(subscription, payload)
    .then(result => console.log(result))
    .catch(e => console.log(e.stack))

  res.status(200).json({ 'success': true })
});

app.listen(9021, () => console.log('The server has been started on the port 9000'))


new CronJob('* * * * *', function () {
  console.log("---- Tentative de récupération des réservations... ----")
  send();
}, null, true, 'Europe/Paris');