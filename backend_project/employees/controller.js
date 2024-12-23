const db=require('./db')
const uuid=require('uuid')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtSecret}=require('./config')
require('dotenv').config({path:'../.env'})

const secret=process.env.JWT_SECRET
const createEmployee=async(req,res)=>{
    try {
        const { name, salary, isActive } = req.body;
        const id=uuid.v4();
        
        const query = 'INSERT INTO employees (id,name, salary, isActive) VALUES (?, ?, ?,?)';
        const values = [id,name, salary, isActive];

        await db.query(query, { replacements: values });
        const newEmployee = {
            id,
            name,
            salary,
            isActive,
        };
        res.status(201).send(newEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

const readEmployee= async(req,res)=>{
    try{
        const [employees] = await db.query('SELECT * FROM employees');
        res.status(201).json(employees);
    }catch(err){
        console.error(err)
    }
}
const deleteEmployee= async(req,res)=>{
    try{
        const {id}=req.params
        await db.query('DELETE from employees where id=?',{replacements:[id]})
        res.status(201).send('Deleted')
    }catch(err){
        console.error(err)
    }
}

const updateEmployee= async(req,res)=>{
    try{
        const {name, salary, isActive, id}=req.body
        await db.query('UPDATE employees set name=?, salary=?, isActive=? where id=?', {replacements:[name,salary,isActive,id]})
        res.status(201).send("updated Successfully")
    }catch(err){
        console.error(err)
    }
}


const newUser=async(req,res)=>{
    try{
        const {firstName,lastName,email,password,gender}=req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await db.query('INSERT INTO users (firstName,lastName, email, password, gender) VALUES (?, ?, ?, ?, ?)', {replacements:[firstName,lastName,email,hashedPassword,gender]})
        res.status(201).send("User Added Successfully")
    }catch(err){
        console.error(err)
    }
}
const readUser=async(req,res)=>{
    try{
        const [users] = await db.query('SELECT * FROM users');
        res.status(201).json(users);
    }catch(err){
        console.error(err)
    }
}
const deleteUser= async(req,res)=>{
    try{
        const {id}=req.params
        await db.query('DELETE from users where id=?',{replacements:[id]})
        res.status(201).send('Deleted')
    }catch(err){
        console.error(err)
    }
}

const updateUser= async(req,res)=>{
    try{
        const {firstName,lastName,email,password,gender}=req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await db.query('UPDATE users set firstName=?, lastName=?, email=?, password=?, gender=? where id=?', {replacements:[firstName,lastName,email,hashedPassword,gender]})
        res.status(201).send("updated Successfully")
    }catch(err){
        console.error(err)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', { replacements: [email] });
        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
        res.json({ token});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};



module.exports={createEmployee,readEmployee,deleteEmployee,updateEmployee, newUser,readUser, deleteUser,updateUser,loginUser,protect}