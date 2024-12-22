const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyparser =require('body-parser');

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the views directory 
app.set('views', './views');

// Use express-ejs-layouts
app.use(expressLayouts);

// body parser
app.use(bodyparser.urlencoded({extended: true}));

// Middleware to set layout based on route
app.use((req, res, next) => {
  if (req.path.startsWith('/admin')) {
    res.locals.layout = './layouts/admin';
  }
  else if(req.path.startsWith('/auth')) {
    res.locals.layout = './layouts/auth';
  }
  else {
    res.locals.layout = './layouts/main';
  }
  next();
});


// Routes
const frontendRoutes = require('./routes/frontendRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/', frontendRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);


const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
