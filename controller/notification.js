const Notification = require("../models/Notification");


async function GetAllNotification (){
    try{

    } catch (error) {
        var response = {
          errors:error,
          status: 400,
          message: "Operation was not successful",
        };
    
        return res.status(400).send(response);
    }
}

module.exports = {
    GetAllNotification,
}