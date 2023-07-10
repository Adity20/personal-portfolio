const express = require('express')
const path = require('path')
const app = express();
const port = process.env.PORT || 4000;

require('./db/conn')

const register = require('./models/register')

const static_path = path.join(__dirname,"../public")

app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path))

app.set('view engine','hbs')

app.get('/',(req,res)=>{
    // res.send("hello world")\
    res.render('index')
})
// app.get('/#contact',(req,res)=>{
//     // res.send("hello world")\
//     res.render('index')
// })

app.post('/', async (req,res)=>{
    try{
        // console.log(req.body.name);
        const registerEmployee=  new register({
            name:req.body.name,
            email:req.body.email,
            subject:req.body.subject,
            message:req.body.message
            
        })
        const registerd = registerEmployee.save()
        res.status(201).render('index')


    } catch (error){
        res.status(400).send(error)
    }


    res.render('index')
})


app.listen(port,()=>{
    console.log(`server is running on port${port}`);
})