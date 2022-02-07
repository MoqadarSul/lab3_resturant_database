const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    building : {
        type : String,
    },
    street : {
        type : String,
        required : true,
    },
    zipcode : {
        type : String,
    }
})
const RestuarantSchema = new mongoose.Schema({
    address: {
        type : AddressSchema,
        required : true,
        lowercase: true
    },
    city : {
        type : String,
        lowercase: true,
        required : true,
    },
    cuisine : {
        type :String,
        lowercase: true,
        required : true,

    },
    name : {
        type : String,
        lowercase: true,
        required: true,
    },
    restaurant_id :{
        type : String
    },
    created: { 
      type: Date,
      default: Date.now,
      alias : 'createdat'
    },
    updatedat: { 
      type: Date,
      default: Date.now
    },
  });


RestuarantSchema.query.byCusineAndCity = function(dish, cityexcluded){
    return this.where('city').nin(cityexcluded).where('cuisine').equals(dish)
                
}

const Restaurant = mongoose.model("restuarant", RestuarantSchema);
module.exports = Restaurant;
  