const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mcs_development', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to MySQL successful');
    })
    .catch((err) => {
        console.error('Unable to connect to MySQL:', err.message);
    });

module.exports = sequelize;
