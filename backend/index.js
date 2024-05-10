const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://keithedolphin:ReayYb2uIFQ7dDam@cluster0.pkquihv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.get('/', (req, res) => {
    res.send('Hello World');
})

const storage = multer.diskStorage({
    destination : './upload/images',
    filename : (req,file,cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}}`)
    }
})

const upload = multer({
    storage : storage
});

app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'), (req,res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`,
    })
})

// product schema (why is this here)

const Product = mongoose.model('Product', {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    available: {
        type: Boolean,
        default: true,
    },
})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    })
    try {
        console.log(product);
        const result = await product.save();
        res.json({
            success: 1,
            message: 'Product added successfully',
            name: req.body.name,
        })
    } catch (error) {
        res.json({
            success: 0,
            message: 'Error',
        })
    }
});

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({
        id: req.body.id,
    });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
        message: 'Product removed successfully',
    });
})

app.get('/allproducts', async (req, res) => { 
    let products = await Product.find({});
    console.log("products found");
    res.send(products);
})

// user schema

const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
})

app.post('/signup', async (req, res) => {
    try {
        let existingUser = await Users.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                errors: 'Email already exists',
            });
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        await user.save();

        const data = {
            user: {
                id: user.id,
            }
        };

        const token = jwt.sign(data, 'secret_ecom');
        res.json({
            success: true,
            token,
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({
            success: false,
            message: 'Error during signup',
            error: error.message,
        });
    }
});

app.post('/login', async (req,res) => {
    let user = await Users.findOne({
        email: req.body.email,
    })
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id,
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({
                success: true,
                token,
            })
        } else {
            res.status(400).json({
                success: false,
                errors: 'Incorrect password',
            })
        }
    } else {
        res.status(400).json({
            success: false,
            errors: 'User does not exist',
        })
    }
    
})

app.get('/newcollection', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New collection");
    res.json(newcollection);
})

app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({category: 'women'});
    let popularinwomen = products.slice(0,4);
    console.log("Popular in women fetched");
    res.json(popularinwomen);
})

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({
            success: false,
            errors: 'No token, authorization denied',
        })
    }
    try {
        const verified = jwt.verify(token,'secret_ecom');
        req.user = verified.user;
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            errors: 'Token is not valid',
        })
    }

}

app.post('/addtocart', async (req, res) => {
    console.log("added", req.body.itemId);
    let userData = Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
})

app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    let userData = Users.findOne({_id:req.user.id});
    if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed");
})

app.post('/getcart', fetchUser, async (req, res) =>{
    console.log("Get cart");
    let userData = Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})




app.post('/checkout', fetchUser, async (req, res) => {
    console.log("Checkout");
    let userData = Users.findOne({_id:req.user.id});
    userData.cartData = {};
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Checked out");
})

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}`);
    } else {
        console.log("Error",error);
    }
})