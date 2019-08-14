const request = require('request');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const webpush = require('web-push')

function sendNotification(hours) {

  const payload = JSON.stringify({
    title: 'Une nouvelle table est disponible !',
    body: `Les horaires disponibles sont ${hours.join(',')}`,
  })

  console.log('Récupération des subscriptions');
  const subscriptions = db.get('subscriptions').value();

  console.log(`Envoi de la notif à ${subscriptions.length} devices`)
  subscriptions.forEach(subscription => {
    webpush.sendNotification(subscription, payload)
      .then(result => {
        console.log('Notification envoyée')
        console.log(result)
        console.log("---- Tentative terminée ----")
      })
      .catch(e => {
        console.log("Erreur lors de l'envoie de la notification envoyée")
        console.log(e.stack)
        console.log("---- Tentative terminée ----")
      })

  });

}

function askForReservation(moment, date, nbPerson) {

  const baseUrl = "https://reservation.lesgrandsbuffets.com/booking/availability-check?"
  const url = `${baseUrl}booking%5Bdate%5D=${date}&booking%5BpaxCount%5D=${nbPerson}&booking%5Bmoment%5D=${moment}&booking%5Bevent%5D%5BeventId%5D=0&booking%5Bevent%5D%5BadultCount%5D=0&booking%5Bevent%5D%5BpayingChildCount%5D=0&booking%5Bevent%5D%5BfreeChildCount%5D=0&booking%5Bevent%5D%5BtotalChange%5D=0&booking%5Bevent%5D%5BtotalCreditCard%5D=0&booking%5Bevent%5D%5BtotalHolidayVoucher%5D=0&booking%5Bevent%5D%5BtotalRestaurantVoucher%5D=0`;

  console.log("Récupération des infos de reservation via le GET");
  request.get(url, (error, response, body) => {
    console.log("GET terminé, parsing des réponses :");
    if (error) {
      console.log("Une erreur est survenue");
      console.error(error);
    } else {
      try {
        const res = JSON.parse(body);
        const { roomspertime } = res;
  
        const availableHours = Object.keys(roomspertime).filter((key) => {
          const value = roomspertime[key];
          const isAvailable = Object
            .keys(value)
            .filter((table) => value[table].available === true).length;
          return isAvailable;
        })

        console.log('Les heures disponibles : ', availableHours)
  
        if (availableHours.length) {
          console.log("/!\ C'est trouvééééééééé !!!! Envoi de la notification")
          sendNotification(availableHours)
        } else {
          console.log('Malheureusement, aucune table est disponible.')
          console.log("---- Tentative terminée ----")
        }
      } catch (err) {
        console.log('Une erreur est survenue lors de la tentative de récupération des tables disponibles')
        console.log('Le body : ', body)
        console.error(err);
        console.log("---- Tentative terminée ----")
      }
    }

  })
}


module.exports = () => {
  const date = "2019-08-19";
  const nbPerson = 4;
  askForReservation("noon", date, nbPerson);
}