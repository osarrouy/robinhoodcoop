const mailgun = require("mailgun-js")
const DOMAIN  = 'sandbox8084e534582a480e95019412fa442b32.mailgun.org'
const KEY     = process.env.MG_KEY
const mg      = mailgun({apiKey: KEY, domain: DOMAIN})


console.log(KEY)

// const data = {
//   from: 'Excited User <me@samples.mailgun.org>',
//   to:   'olivier.sarrouy@gmail.com',
//   subject: 'Hello',
//   text: 'Testing some Mailgun awesomness!'
// }

// mg.messages().send(data, function (error, body) {
//     console.log('body')
//     console.log(body)
//     console.log('error')
//     console.log(error)
// })