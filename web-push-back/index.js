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

webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

app.post('/notifications/subscribe', (req, res) => {
  const subscription = req.body
  db.get('subscriptions')
    .push(subscription)
    .write();
  res.status(200).json({ 'success': true })
});

app.listen(9000, () => console.log('The server has been started on the port 9000'))


new CronJob('*/5 * * * * *', function () {
  send();
}, null, true, 'Europe/Paris');