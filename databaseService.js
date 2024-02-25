const expree  = require("express")
const mysql = require("mysql")
const cors = require("cors")

exports.queryDatabase = async (query) => {
    // Implementation logic to interact with the database
    
const app = expree()
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"sims"
})
app.use(expree.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("hello from backend")
})
};
