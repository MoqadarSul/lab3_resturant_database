const express = require('express');
const resturantModel = require('../models/Restuarant')
const app = express();

//Getting all restuarants
    // app.get( '/restaurants' ,async (req, res) => {
    // const allResturants = await resturantModel.find({});

    // try {
    //      res.status(200).send(allResturants);
    //    } catch (err) {
    //      res.status(500).send(err);
    //    }
    // }),
//Getting restuarants by cuisine
app.get('/restaurants/cuisine/:category', async (req, res) => {
    const cat = req.params.category;
    const resturants = await resturantModel.find({cuisine : cat});

    try {
        if(resturants.length != 0){
          res.send(resturants);
        }else{
          res.send(JSON.stringify({status:false, message: "No data found"}))
        }
      } catch (err) {
        res.status(500).send(err);
      }

}),
app.post('/restaurant', async (req, res) => {
  
    console.log(req.body)
    const restaurant = new resturantModel(req.body);
    try {
        await restaurant.save((err) => {
          if(err){
            res.send(err)
          }else{
            res.send(restaurant);
          }
        });
      } catch (err) {
        res.status(500).send(err);
      }
  }),
app.get('/restaurants', async (req, res) => {
    const sortBy = req.query.sortby;
    const resturants = await resturantModel.find({}, '_id cuisine name city restaurant_id').sort({ 'restaurant_id' : sortBy});
  
    try {
        if(resturants.length != 0){
          res.send(resturants);
        }else{
          res.send(JSON.stringify({status:false, message: "No data found"}))
        }
      } catch (err) {
        res.status(500).send(err);
      }
}),
app.get('/restaurants/delicatessen', async (req, res) => {

    const dish = 'Delicatessen';
    const city = 'Brooklyn';
    const resturants = await resturantModel.find({},{_id:0, name:1, cuisine:1, city:1}).byCusineAndCity(dish, city).sort({'name' : 'asc'});
    
    
    console.log(resturants)

   // console.log(resturants.length)
    try {
        if(resturants.length != 0){
          res.send(resturants);
        }else{
          res.send(JSON.stringify({status:false, message: "No data found"}))
        }
      } catch (err) {
        res.status(500).send(err);
      }
}),
  

    app.get( '/about', ( req, res ) => {
    res.type( 'text/plain' )
    res.send( 'Server Expresso ☕ About')
    })


module.exports = app