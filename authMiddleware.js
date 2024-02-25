exports.authenticate = async (req, res, next) => {
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

app.get("/student",(req,res)=>{
    let query = "SELECT * FROM student;"
    db.query(query,(err,data)=>{
        if(err) return res.json("error occured while fetching all data")
        return res.json(data)

    })
})
app.get("/student/:id",(req,res)=>{
    let id = req.params.id
    let query = `SELECT * FROM student WHERE student_id='${id}';`
    db.query(query,(err,data)=>{
        if(err) return res.json("error occured while fetching all data")
        return res.json(data)

    })
})

app.post("/company_register",(req,res)=>{
    let query = "INSERT INTO company(`company_name`,`company_phoneno`,`company_email`,`company_password`) VALUES(?)"
    let locationArr = req.body.locations
    let values = [
        req.body.name,
        req.body.phoneno,
        req.body.email,
        req.body.password,
    ]
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err)
        // if(err) return res.json("error occured while inserting data")
    // console.log(data.insertId);
        if(data.affectedRows==1){
            let cid = data.insertId
            locationArr.forEach(location => {
                let query = "INSERT INTO company_location(`company_id`,`company_location`) VALUES(?)"
                let values = [cid,location]
                db.query(query,[values],(err,data)=>{
                    if(err) return res.json(err)
                    return
                })
            });
        }
        // return res.json(data)
    })
})

app.post("/company_login",(req,res)=>{
    let values = [
        req.body.cEmail,
        req.body.cPassword,
    ]
    let query = `SELECT * FROM company WHERE company_email='${values[0]}' AND company_password='${values[1]}'`
    db.query(query,(err,data)=>{
        if(err) return res.json(err)
        // if(err) return res.json("error occured while inserting data")
        return res.json(data)
    })
})

app.get("/company",(req,res)=>{
    let query = "SELECT * FROM company;"
    db.query(query,(err,data)=>{
        if(err) return res.json("error occured while fetching all data")
        return res.json(data)

    })
})

app.get("/company/:id",(req,res)=>{
    let id = req.params.id
    let query = `SELECT * FROM company WHERE company_id='${id}'`
    db.query(query,(err,data)=>{
        if(err) return res.json("error occured while fetching all data")
        return res.json(data)

    })
})


app.post("/internship_create",(req,res)=>{
    let query = "INSERT INTO internship(`internship_title`,`internship_desc`,`internship_startdate`,`internship_enddate`) VALUES(?)"
    let cid = req.body.cid
    let values = [
        req.body.title,
        req.body.desc,
        req.body.sdate,
        req.body.edate,
    ]
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err)
        // if(err) return res.json("error occured while inserting data")
    // console.log(data.insertId);
        if(data.affectedRows==1){
            let iid = data.insertId
                let query = "INSERT INTO company_offers_internship(`company_id`,`internship_id`) VALUES(?)"
                let values = [cid,iid]
                db.query(query,[values],(err,data)=>{
                    if(err) return res.json(err)
                    return
                })
        }
        // return res.json(data)
    })
})

app.get("/internship",(req,res)=>{
    let query = "SELECT * FROM internship;"
    db.query(query,(err,data)=>{
        if(err) return res.json("error occured while fetching all data")
        return res.json(data)

    })
})

app.post("/studnetEnrollInternship",(req,res)=>{
    let query = "INSERT INTO student_take_internship(`student_id`,`internship_id`) VALUES(?)"
    let values = [
       req.body.sid,
       req.body.iid
    ]
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err)
        // if(err) return res.json("error occured while inserting data")
        return res.json(data)
    })
})

};
