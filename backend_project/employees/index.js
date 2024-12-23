const express = require('express')
const cors=require('cors')
const app = express()
const port = 8000
const db=require('./db')
// const {Employee, User}=require('./model')
const {createEmployee,readEmployee,deleteEmployee,updateEmployee,newUser,readUser,deleteUser,updateUser,loginUser,protect}=require('./controller')

app.use(cors());
app.use(express.json());

app.post('/create',createEmployee)
app.get('/read',readEmployee)
app.delete('/delete/:id',deleteEmployee)
app.patch('/update',updateEmployee)

app.post('/userCreated',newUser)
app.get('/userRead',readUser)
app.delete('/userDelete/:id',deleteUser)
app.patch('/userUpdate',updateUser)

app.post('/login', loginUser);


db.authenticate().then(()=>{
    console.log("Connection Established Successfully");
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
}).catch((error)=>{
    console.error("Unable to Connect to the database", error)
});
