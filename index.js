const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the views directory 
app.set('views', './views');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
