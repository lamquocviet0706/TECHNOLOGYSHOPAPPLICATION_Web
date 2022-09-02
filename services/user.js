
const userModel = require('../models/userModel');

exports.get = async function(){
    
    return await userModel.find();
}
exports.getOne = async function(username){
    const user = await userModel.findOne({username:username});
    return user;
}
    exports.switchrole = async function(_id){
        let user = await userModel.findById({_id})
        if(user){
            if(user.role==1){
                user.role=2;
        }else{
            user.role=1;
        }
        
            await user.save();
        }
        
    }

exports.login = async function login(username){
    
    const user = await userModel.findOne({username:username, role: 1}, '_id username password');
    return user;
}

exports.loginAPI = async function login(username){
    
    const user = await userModel.findOne({username:username, role: 2}, '_id username password');
    return user;
}


exports.register = async function(username,password) {
    const user = new userModel({username,password});
    user.role = 2;
    return await user.save();
    
    
}