exports.performSearch = async (query) => {
    // Implementation logic for search functionality
    app.get("/company/:id",(req,res)=>{
        let id = req.params.id
        let query = `SELECT * FROM company WHERE company_id='${id}'`
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
};
