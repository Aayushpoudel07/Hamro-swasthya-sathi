const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyparser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport');
const db = require('./models/index');

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the views directory 
app.set('views', './views');

// Use express-ejs-layouts
app.use(expressLayouts);

// body parser
app.use(bodyparser.urlencoded({ extended: true }));

// Session middleware for managing sessions
app.use(
  session({
    secret: 'hahaha',
    resave: false,
    saveUninitialized: true,
  })
);


// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  // Check if the user is authenticated via passport
  res.locals.isLoggedIn = req.isAuthenticated() ? true : false; // passport.js will handle user authentication
  res.locals.user = req.user;  // Store user data in res.locals to access in views
  next();
});


// Middleware to set layout based on route
app.use((req, res, next) => {
  if (req.path.startsWith('/admin')) {
    res.locals.layout = './layouts/admin';
  }
  else if (req.path.startsWith('/auth')) {
    res.locals.layout = './layouts/auth';
  }
  else if (req.path.startsWith('/doctor')) {
    res.locals.layout = './layouts/doctor';
  }
  
  else if (req.path.startsWith('/user')) {
    res.locals.layout = './layouts/user';
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
const doctorRoutes = require('./routes/doctorRoutes');

const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointment');


app.use('/', frontendRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/doctor', doctorRoutes);

app.use('/user', userRoutes);
app.use('/appointment', appointmentRoutes);


// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
