const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/checkout', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database Connection established");
});


let checkoutSchema = mongoose.Schema({
  //_id: Number, // Customer ID
  acctInfo: {
    name: String, // Customer Name
    email: String,
    password: String // Customer Password
  },
  shippingInfo: {
    street1: String, // Street line 1
    street2: String, // Street line 2
    city: String, // City
    zip: Number, // Zip code
    phone: Number // Phone number
  },
  cardInfo: {
    cardNumber: Number, // Credit Card number
    expirationMonth: Number, // Credit Card Expiration Month (01)
    expirationYear: Number, // Credit Card Expiration Year (2019)
    ccv: Number, // Last 3 or 4 digits for security
    billingZip: Number // Billing Zip (not sure what that is)
  }
});

let Checkout = mongoose.model('Repo', checkoutSchema);

module.exports = Checkout;