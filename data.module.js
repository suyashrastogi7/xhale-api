const db = require('./DB/connection');
const orderSchema = require('./DB/Schema/orderSchema');
const CompletedOrderSchema = require('./DB/Schema/CompletedOrderSchema')



//SCHEMAS
const userSchema = require('./DB/Schema/userSchema');

class DataService {
    constructor(){
    }
    async addUser(data){
        try{
            db();
            await new userSchema(data).save();
        }
        catch(err) {
            console.log(err);
        }
    };
    async getUser(data){
        try{
            db();
            const result = await userSchema.find({
                email : data.email
            });
            return result;
        }
        catch(err) {
            console.log(err);
        }
    };
    async addOrder(data){
        try{
            db();
            await new orderSchema(data).save();
        }
        catch(err) {
            console.log(err);
        }
    };
    async getOrderDetails(data){
        try{
            db();
            const result = await orderSchema.find(data);
            return result;
        }
        catch(err) {
            console.log(err);
        }
    };
    async updateOrder(data){
        try{
            let result;
            db();
            if(data.type === 'delivered'){
                return result = await orderSchema.findOneAndUpdate({_id : data._id}, {delivered : true, deliver_time : new Date()}, {new : true});
            }
            else if(data.type === 'in_use'){
                return result = await orderSchema.findOneAndUpdate({_id : data._id}, {in_use : true, in_use_time : new Date()}, {new : true});
            }
            else if(data.type === 'collected'){
                await orderSchema.findOneAndUpdate({_id : data._id}, {collected : true, collected_time : new Date()}, {new : true})
                .then(async () => {
                    await orderSchema.findOne({_id : data._id})
                    .then(async doc => {
                        CompletedOrderSchema.insertMany([doc])
                    }) 
                    await orderSchema.findOneAndDelete({_id : data._id})
                    
                })
                .catch(err => {
                    console.log(err)
                })
            }
            else {
                console.log('no match')
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    async getOrders(){
        try{
            db();
            const result = await orderSchema.find({});
            return result;
        }
        catch(err) {
            console.log(err);
        }
    };
    async getCompletedOrders(){
        try{
            db();
            const result = await CompletedOrderSchema.find({});
            return result;
        }
        catch(err) {
            console.log(err);
        }
    };
}

module.exports = DataService;