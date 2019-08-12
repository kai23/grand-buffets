const request = require('request');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const webpush = require('web-push')

function sendNotification(hours) {

  console.log('hours', hours);

  const payload = JSON.stringify({
    title: 'Une nouvelle table est disponible !',
    body: `Les horaires disponibles sont ${hours.join(',')}`,
  })

  const subscriptions = db.get('subscriptions').value();

  console.log('subscriptions', subscriptions);

  subscriptions.forEach(subscription => {
    webpush.sendNotification(subscription, payload)
      .then(result => console.log(result))
      .catch(e => console.log(e.stack))
  });
}

function askForReservation(moment, date, nbPerson) {

  const baseUrl = "https://reservation.lesgrandsbuffets.com/booking/availability-check?"
  const url = `${baseUrl}booking%5Bdate%5D=${date}&booking%5BpaxCount%5D=${nbPerson}&booking%5Bmoment%5D=${moment}&booking%5Bevent%5D%5BeventId%5D=0&booking%5Bevent%5D%5BadultCount%5D=0&booking%5Bevent%5D%5BpayingChildCount%5D=0&booking%5Bevent%5D%5BfreeChildCount%5D=0&booking%5Bevent%5D%5BtotalChange%5D=0&booking%5Bevent%5D%5BtotalCreditCard%5D=0&booking%5Bevent%5D%5BtotalHolidayVoucher%5D=0&booking%5Bevent%5D%5BtotalRestaurantVoucher%5D=0`;

  request.get(url, (error, response, body) => {
    const res = JSON.parse(body);

    const { roomspertime } = res;

    const availableHours = Object.keys(roomspertime).filter((key) => {
      const value = roomspertime[key];
      const isAvailable = Object
        .keys(value)
        .filter((table) => value[table].available === true).length;
      return isAvailable;
    })

    if (availableHours.length) {
      sendNotification(availableHours)
    } else {
      console.log(':(')
    }
  })
}


module.exports = () => {
  const date = "2019-09-25";
  const nbPerson = 4;
  askForReservation("noon", date, nbPerson);
}