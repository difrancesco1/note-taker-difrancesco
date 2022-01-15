//Express const
const express = require('express');

//Route Files to correct locations
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//App Variable to Express
const app = express();

//Set port 3001, this is default
const PORT = process.env.PORT || 3001;

//use methods
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//Listener
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`); //tells us when the server is up with this message and shows the port we use (3001)
});