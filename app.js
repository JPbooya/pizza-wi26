import express from 'express';
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

