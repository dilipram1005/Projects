require('dotenv').config();
const express=require('express');
const mysql=require('mysql');
const cors=require('cors');
const bodyParser=require('body-parser')
const db=mysql.createPool({
    host:"",
    user:"",
    password:"",
    database:"",
    connectionLimit:100
})
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Demo");
})
app.post('/api/insert',(req,res)=>{
    const Name=req.body.movieName;
    const Reviews=req.body.moviewReview;
    const sqlInsert="Insert into MovieReviews(MovieName,MovieReview) values (?,?);"
    db.query(sqlInsert,[Name,Reviews],(error,results)=>{
        if(error)throw error;
        console.log(results);
    });
})
app.get('/api/get',(req,res)=>{
    const sqlGet="select *  from MovieReviews;"
    db.query(sqlGet,(error,results)=>{
        if(error)throw error;
        res.send(results);
    });
})

app.delete('/api/delete/:MovieName',(req,res)=>{
    const MovieName=req.params.MovieName;
    console.log(`Deleting Movie:${MovieName}`);
    const sqlDelete="Delete from MovieReviews where MovieName=?;"
    db.query(sqlDelete,MovieName,(error,results)=>{
        if(error) throw error;
        console.log(results);

    })
})

app.put('/api/update/:MovieName',(req,res)=>{
    const Name=req.params.MovieName;
    const Reviews=req.body.moviewReview;
        const sqlUpdate="update MovieReviews set MovieReview=? where MovieName=?"
    db.query(sqlUpdate,[Reviews,Name],(error,results)=>{
        if(error) throw error;
        console.log(results);

    })
})



app.listen(PORT_NUMBER,()=>{console.log('Your Port Serving Service Request')});