const express = require("express")
const router = express.Router()

router.get("/", (req,res)=>{
    res.send("Users list");
})

router.get("/new", (req,res)=>{
    res.send("User new form");
})

router.post('/', (req,res)=>{
    res.send("create user");
})

router.route("/:id").get((req,res)=>{
    const userId = req.params.id;
    const page = req.query.page;

    res.json({userId, page})
    console.log(req.user)
    //res.send(`get user with id ${req.params.id}`)
}).put((req,res)=>{
    res.send(`update user with id ${req.params.id}`)
}).delete((req,res)=>{
    res.send(`delete user with id ${req.params.id}`)
})

const user = [{name: "Kyle", age: "19"}, {name:"Zeke", age:"19"} ]
router.param("id", (req,res,next,id)=>{
    req.user = user[id]
    console.log(id)
    next()
})

module.exports = router