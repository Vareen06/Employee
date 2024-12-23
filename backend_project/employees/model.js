const sequelize = require('./db');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')
const Employee = sequelize.define('employees', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN
    },
}, {
    timestamps: false
});


const User= sequelize.define('users',{
    firstName:{
        type:DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    gender:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps: false,
    hooks:{
        beforeCreate:async(user)=>{
            const salt= await bcrypt.genSalt(10);
            user.password= await bcrypt.hash(user.password, salt)
        }
    }
})

sequelize.sync().then(() => {
    console.log("employees table created successfully");
}).catch((error) => {
    console.log("employees table not created", error);
});

sequelize.sync().then(() => {
    console.log("users table created successfully");
}).catch((error) => {
    console.log("users table not created", error);
});

module.exports = {Employee, User};
