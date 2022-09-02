
const userService = require('../services/user');
const bcrypt = require('bcryptjs');

exports.get = async function(){
    return await userService.get();
}

exports.switchrole = async function(_id){
    return await userService.switchrole(_id);
}

exports.login = async function login(username,password){
    const user = await userService.login(username);
    if(!user){
        return null;
    }
    const checkpass = await bcrypt.compare(password,user.password);
    if(!checkpass){
        return null;
    }
    return {id: user._id, username: user.username};

}

exports.loginAPI = async function login(username,password){
    const user = await userService.loginAPI(username);
    if(!user){
        return null;
    }
    const checkpass = await bcrypt.compare(password,user.password);
    if(!checkpass){
        return null;
    }
    return {id: user._id, username: user.username};

}

exports.register = async function (username,password,confirm_password) {
    if(password != confirm_password) return null;
    let allUser = await userService.getOne(username);
    if(allUser) return ;
    let user = await userService.login(username);
    if(user) return null;
     
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    user = await userService.register(username,hash);
    return {_id:user.id};
    
}