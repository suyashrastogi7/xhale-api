//IMPORTS
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT  = process.env.PORT;

//APP PROPERTIES
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.listen(PORT, () =>  {
    console.log("server is running on port : " + `${PORT}`)
});

//CONTROLLERS
const Controller = require('./Controllers/authController');
const orderController = require('./Controllers/orderController');




//GET POST FUNCTIONS
app.post('/login', cors(), Controller.login);
app.get('/order', cors(), orderController.GetOrders);
app.post('/order', cors(), orderController.AddOrder);
app.post('/order/:_id', cors(), orderController.GetOrderDetail);
app.post('/update-order/:_id/:type', cors(), orderController.UpdateOrder);
app.get('/completed-order', cors(), orderController.GetCompletedOrders);