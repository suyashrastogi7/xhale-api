const DataService = require('../data.module');
const Data = new DataService();

const AddOrder = async (req,res) => {
    const data = req.body;
    await Data.addOrder(data)
    .then(resu => {
        res.send(resu)
    })
    .catch(err => {
        console.log(err,"error while adding")
    })

};

const GetOrderDetail = async (req,res) => {
    const data = {
        _id : req.params._id
    }
    await Data.getOrderDetails(data)
    .then(resu => {
        res.send(resu)
    })
    .catch(err => {
        console.log(err,"error while adding")
    })

};


const UpdateOrder = async (req,res) => {
    const data = {
        _id : req.params._id,
        type : req.params.type
    }
    await Data.updateOrder(data)
    .then(resu => {
        res.send(resu)
    })
    .catch(err => {
        console.log(err,"error while adding")
    })

};

const GetOrders = async (req,res) => {
    const result = await Data.getOrders()
    res.send(result);
}

const GetCompletedOrders = async (req,res) => {
    const result = await Data.getCompletedOrders()
    res.send(result);
}

module.exports = {
    AddOrder : AddOrder,
    GetOrders : GetOrders,
    GetOrderDetail : GetOrderDetail,
    UpdateOrder : UpdateOrder,
    GetCompletedOrders : GetCompletedOrders
}