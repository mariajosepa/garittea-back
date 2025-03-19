const express = require('express')
const personRoutes = require('./routes/personRoutes.js')
const PORT = process.env.PORT || 3000;

const app = express();

//define the routes
app.use('/person', personRoutes);

//launch the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})