const jwt = require('jsonwebtoken')
const UserModel = require('../models/users')
const SECRET = process.env.SECRET.split('_')

class TokenService {
    geterateToken(payload) {
        const accessToken = jwt.sign(payload, SECRET[0], {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, SECRET[1], {expiresIn: '7d'})
        return {
            accessToken,
            refreshToken
        }
    }
    valAccessTok(token) {
        try {
            const userData = jwt.verify(token, SECRET[0]);
            return userData
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    valRefreshTok(token) {
        try {
            const userData = jwt.verify(token, SECRET[1]);
            return userData
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async saveToken(login, refreshToken) {
        const tokenData = await UserModel.findOne({login})
        if (tokenData) {
            const token = await UserModel.findByIdAndUpdate(tokenData._id, {refreshToken});
            return token;
        } else {
            console.log('error');
        }
    }
    async removeToken(refreshToken) {
        await UserModel.findOneAndUpdate({refreshToken}, {refreshToken: null})
        return;
    }
    async findToken(refreshToken) {
        const tokenData = await UserModel.findOne({refreshToken});
        return tokenData;
    }
    
}

    module.exports = new TokenService();