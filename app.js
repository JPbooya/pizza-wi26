import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

// load enviroment variables from .env
dotenv.config
console.log(process.env.DB_HOST);

const app = express();
const PORT = 3001;
app.use(express.static('public'));

// set ejs as the view engine
app.set('view engine', 'ejs');

/* middleware that allows express to read 
 form data and store it in req.body */
app.use(express.urlencoded({extended: true}));

// create a temp array to store orders
const orders = []; 

// create a pool bucket of database connections
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user:process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
}).promise();

// database test route
// async and await keyword needs too be togther too excute the function
app.get('/db-test', async(req, res) => {
  try {
    const pizza_orders = await pool.query('SELECT * FROM orders')
    res.send(pizza_orders[0])
  } catch(err) {
    console.error('Database error: ', err);
  }

});

app.get('/', (req, res) => {
  res.render('home');
});

// Contact route
app.get('/contact-us', (req, res) => {
  res.render('contact')
});

// confirmation route
app.get('/thank-you', (req, res) => {
  res.render('confirmation')
});

// admin route
app.get('/admin', (req, res) => {
  res.render('admin', {orders});
});

// submit-order route
app.post('/submit-order', (req, res) => {

  // create a json object
  const order = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    method:req.body.method,
    toppings: req.body.toppings,
    size: req.body.size,
    comment: req.body.comment,
    timestamp: new Date()
  };

  // add order object to orders array
  orders.push(order);

 // res.send(orders);
  res.render('confirmation', { order });
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
});

