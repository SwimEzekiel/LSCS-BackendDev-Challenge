//Function to validate a newly created Product object 
//given by a JSON file
//All essential fields must be complete and valid, 
//else returns a status code of 400 with error message.
function validateCreate(req,res,next){
    const product = req.body;
    if (!product || !product.productName || !product.price || !product.stock || !product.category || !product.description)
        return res.status(400).json({error: "Missing required fields"})
    if (typeof(product.productName) !== 'string')
        return res.status(400).json({error: "Product name must be a string"})
    if (product.price < 0 || typeof(product.price) !== 'number')
        return res.status(400).json({error: "Price must not be less than 0"})
    if (product.stock < 0 || typeof(product.stock) !== 'number')
        return res.status(400).json({error: "Stock must not be less than 0"})
    if (typeof(product.category) !== 'string')
        return res.status(400).json({error: "Category must be a string"})
    if (typeof(product.description) !== 'string')
        return res.status(400).json({error: "Description must be a string"})
    
    //1 more custom variable validation
    //1 more custom variable validation

    //pass req.body as param
    //use throw instead of res.status.json
    next()
}


//Function that validates individual input 
//Does not require all valid parameters in the JSON file
function validateEdit(req,res,next){
    const editedVariables = req.body

    if (typeof(editedVariables.productName) !== 'string' || typeof(editedVariables.productName) == 'null'){
        return res.status(400).json({error: "Product name must be a string"})
    } if (editedVariables.price < 0 || typeof(editedVariables.price) !== 'number'){
        return res.status(400).json({error: "Price must not be less than 0"})
    } if (editedVariables.stock < 0 || typeof(editedVariables.stock) !== 'number'){
        return res.status(400).json({error: "Stock must not be less than 0"})
    } if (typeof(editedVariables.category) !== 'string' || typeof(editedVariables.category) == 'null'){
        return res.status(400).json({error: "Category must be a string"})
    } if (typeof(editedVariables.description) !== 'string' || typeof(editedVariables.description) == 'null'){
        return res.status(400).json({error: "Description must be a string"})
    } 
    next()
}

module.exports = {validateCreate, validateEdit};
