exports.cacheData = async (key, data) => {
    // Implementation logic for in-memory caching
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
};

exports.getCachedData = async (key) => {
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
    // Implementation logic to retrieve cached data
};
