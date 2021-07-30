const express = require('express');
const cors = require('cors');
const cookies = require('cookie-parser');

const port = 8000;

const app = express();

app.use(cookies());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({ extended: true }));


require('./server/config/mongoose.config');

const AllRoutes = require('./server/routes/user.routes');

AllRoutes(app);


app.listen(port, () => console.log(`Loaded - Listening on port ${port}!`));