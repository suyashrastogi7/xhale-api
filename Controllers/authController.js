const DataService = require('../data.module');
const Data = new DataService();
require('dotenv').config();
const bcrypt = require('bcrypt');


const Login = async (req,res) => { 
    const data = {
        username : req.body.username,
        password : req.body.password
    };
    console.log(data)
    await Data.getUser(data).then(result => {
        console.log(result)
        bcrypt.compare(data.password, result[0].password, (err, resu) => {
            console.log(resu)
            if(resu == true){
            const user = {
                username : result[0].username,
                loginResult : resu
            }
            console.log(user)
            console.log('successful')
            res.send(user)
            }
            else{
                console.log('password incorrect')
                console.log(err)
                res.send(false)
            }
        });
    })
    .catch(err => {
        console.log(err)
    })
};


module.exports = {
    login : Login
}