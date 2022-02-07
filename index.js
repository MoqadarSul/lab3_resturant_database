const express = require( 'express' )
const resturantRouter = require('./routes/RestuarantRoutes.js');
const mongoose = require('mongoose');
const port    = process.env.PORT || 3000

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://moqadar:root@cluster0.j9mgd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

app.use(resturantRouter)

app.listen(port, () => { console.log('Server is running...') });
