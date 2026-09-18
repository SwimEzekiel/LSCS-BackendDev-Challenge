//Function to validate a newly created Product object 
//given by a JSON file
//All essential fields must be complete and valid, 
//else returns a status code of 400 with error message.
function validateCreate(req,res,next){
    const product = req.body;
    if (!product || !product.productName || !product.category || !product.description)
        return res.status(400).json({error: "Missing required fields"})
    if (typeof(product.productName) !== 'string')
        return res.status(400).json({error: "Product name must be a string"})
    if (product.price <= 0 || typeof(product.price) !== 'number')
        return res.status(400).json({error: "Price must not be less than 0 or must not be null"})
    if (product.stock <= 0 || typeof(product.stock) !== 'number')
        return res.status(400).json({error: "Stock must not be less than 0 or must not be null"})
    if (typeof(product.category) !== 'string')
        return res.status(400).json({error: "Category must be a string"})
    if (typeof(product.description) !== 'string')
        return res.status(400).json({error: "Description must be a string"})
    
    //1 more custom variable validation
    //1 more custom variable validation
    next()
}


//Function that validates individual input 
//Does not require all valid parameters in the JSON file
function validateEdit(req,res,next){
    const editedVariables = req.body

    next()
}

module.exports = {validateCreate, validateEdit};
