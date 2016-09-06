const express = require('express');
const services = require('./routes/services');
const personal = require('./routes/personal');

const app = express();
const port = 5000;

app.use('/api/services', services);
app.use('/api/personal', personal);

app.listen(port, function(){
  console.log(`Listening on port ${port}`)
});
