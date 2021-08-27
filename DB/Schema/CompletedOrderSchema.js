const mongoose = require('mongoose');

const completedOrderSchema = mongoose.Schema({
    _id : String,
    first_name : String,
    last_name : String,
    phone : String,
    hookahSize : String,
    hookahId : String,
    hookahFlavor: String,
    hookahPrice : String,
    houseNumber : String,
    street_name : String,
    area_name : String,
    pincode : String,
    delivered : Boolean,
    in_use : Boolean,
    collected : Boolean,
    deliver_time : Date,
    in_use_time : Date,
    collected_time : Date
});

module.exports = mongoose.model('completed-orders', completedOrderSchema);