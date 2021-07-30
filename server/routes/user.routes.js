const Users = require("../controllers/user.controller");
const Coin = require('../controllers/user.controller');
const { authenticate } = require("../config/jwt.config");
const { authUser } = require("../controllers/user.controller");


module.exports = app => {
    app.get('/api/users/auth', authenticate, Users.authUser);
    app.get('/api/logout', authenticate, Users.logout);
    
    app.post('/api/register', Users.register);
    app.post('/api/login', Users.login);
    app.get('/api/users', Users.userIndex);
    app.get('/api/users/:_id', Users.oneUser);
    app.put('/api/users/update/:_id', Users.updateUser);
    app.put('/api/users/updatepass/:_id', Users.updateUserPass);
    app.delete('/api/users/delete/:_id', Users.destroyUser);
    
    app.post('/api/manual', Users.manualadd);
    
    app.post('/api/coin/add/:_id', Coin.addUserCoin);
    app.put('/api/coin/delete/:_id/:coinid', Users.destroyUserCoin);
    app.put('/api/coin/update/:_id/:coinid', Users.updateUserCoin);
    
    
}