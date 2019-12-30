const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/checkout', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database Connection established");
});


let checkoutSchema = mongoose.Schema({
  //_id: Number, // Customer ID
    name: String, // Customer Name
    email: String,
    password: String, // Customer Password
    street1: String, // Street line 1
    street2: String, // Street line 2
    city: String, // City
    zip: Number, // Zip code
    phone: Number, // Phone number
    card_Number: Number, // Credit Card number
    expiration: Number, // Credit Card Expiration Month and year
    ccv: Number, // Last 3 or 4 digits for security
    billing_Zip: Number // Billing Zip
});

let Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;