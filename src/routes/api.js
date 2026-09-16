const express = require("express")
const router = express.Router()


router.post('/products', (req,res)=>{
    const product = req.body;

    res.status(201).json({
        message: "New Product Created!",
        product: "Pin"
    })
})

router.get('/products', (req,res)=>{
    res.send("wow!!")
})

router.route('/products/:id').get((req, res)=>{
    const userId = req.params.id
    const body = req.params.body

    res.json({userId, body})
    console.log(req.userId)
}).put((req,res)=>{
    res.send("wow! edit!")
}).delete((req,res)=>{
    res.send("do you want to delete this?")
})


module.exports = router