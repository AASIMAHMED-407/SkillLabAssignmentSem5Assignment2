exports.performAggregation = async (pipeline) => {
    // Implementation logic for MongoDB aggregation
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


app.post("/student_register",(req,res)=>{
    let query = "INSERT INTO student(`student_name`,`student_usn`,`student_phoneno`,`student_gender`,`student_email`,`student_password`) VALUES(?)"
    let values = [
        req.body.name,
        req.body.usn,
        req.body.phoneno,
        req.body.gender,
        req.body.email,
        req.body.password,
    ]
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err)
        // if(err) return res.json("error occured while inserting data")
        return res.json(data)
    })
})

app.post("/student_login",(req,res)=>{
    let values = [
        req.body.sEmail,
        req.body.sPassword,
    ]
    let query = `SELECT * FROM student WHERE student_email='${values[0]}' AND student_password='${values[1]}'`
    db.query(query,(err,data)=>{
        if(err) return res.json(err)
        // if(err) return res.json("error occured while inserting data")
        return res.json(data)
    })
})
};
