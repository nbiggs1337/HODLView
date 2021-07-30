const mongoose = require('mongoose');

const db_name = 'hodlview';


mongoose.connect(`mongodb://localhost/${db_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`....Established connection with ${db_name} database....`))
    .catch(err => console.log(err));

