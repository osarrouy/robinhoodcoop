const mailgun = require("mailgun-js")
const DOMAIN  = 'YOUR_DOMAIN_NAME'
const KEY     = process.env.MG_KEY
const mg      = mailgun({apiKey: KEY, domain: DOMAIN})


// exports.handler = function(event, context, callback) {
//   const data = {
//     from: 'Excited User <me@samples.mailgun.org>',
//     to:   'olivier.sarrouy@gmail.com, YOU@YOUR_DOMAIN_NAME',
//     subject: 'Hello',
//     text: 'Testing some Mailgun awesomness!'
//   }

//   mg.messages().send(data, function (error, body) {
//     if (body) {
//       callback(null, {
//         statusCode: 200,
//         body
//       })
//     } else {
//       callback(error, null)
//     }
//   })
// }

exports.handler = async event => {
  const subject = event.queryStringParameters.name || 'World'
  return {
    statusCode: 200,
    body: `Hello ${subject}!`,
  }
}