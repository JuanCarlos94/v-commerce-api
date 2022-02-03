const mongoose = require('mongoose');
const uri = process.env.DATABASE_URI;

mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.once('open', function(err) {
    if(err)
        console.log(err);
});