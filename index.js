const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the views directory 
app.set('views', './views');

// Use express-ejs-layouts
app.use(expressLayouts);

// Middleware to set layout based on route
app.use((req, res, next) => {
  if (req.path.startsWith('/admin')) {
    res.locals.layout = './layouts/admin';
  } else {
    res.locals.layout = './layouts/main';
  }
  next();
});

// Routes
const frontendRoutes = require('./routes/frontendRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/', frontendRoutes);
app.use('/admin', adminRoutes);


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
