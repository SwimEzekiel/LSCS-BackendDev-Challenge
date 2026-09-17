//Function to validate a newly created Product object 
//given by a JSON file
//All essential fields must be complete and valid, 
//else returns a status code of 400 with error messag.
function validateCreate(req,res,next){
    const product = req.body;
    if (!product || !product.id || !product.productName || !product.price || !product.stock || !product.category || !product.description){
        return res.status(400).json({error: "Missing required fields"})
    } if (typeof(product.id) !== 'number'){
        return res.status(400).json({error: "ID number must be a number"}) //might remove this with sql implementation
    } if (typeof(product.productName) !== 'string' || typeof(product.productName) == 'null'){
        return res.status(400).json({error: "Product name must be a string"})
    } if (product.price < 0 || typeof(product.price) !== 'number'){
        return res.status(400).json({error: "Price must not be less than 0"})
    } if (product.stock < 0 || typeof(product.stock) !== 'number'){
        return res.status(400).json({error: "Stock must not be less than 0"})
    } if (typeof(product.category) !== 'string' || typeof(product.category) == 'null'){
        return res.status(400).json({error: "Category must be a string"})
    } if (typeof(product.description) !== 'string' || typeof(product.description) == 'null'){
        return res.status(400).json({error: "Description must be a string"})
    } 
    //1 more custom variable validation
    //1 more custom variable validation
    next()
}


//Function that validates individual input 
//Does not require all valid parameters in the JSON file
function validateEdit(req,res,next){
    const editedVariables = req.body

    if (typeof(editedVariables.price) !== 'number'){
        return res.status(400).json({error: "Price must be a number"})
    } if (typeof(editedVariables.productName) !== 'string' || typeof(product.productName) == 'null'){
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
}

module.exports = validate;