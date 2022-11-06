import express from 'express';
import config from './config.json' assert { type: 'json' };
import router from './routes/router.js';

var app = express();
var port = config.server.port || 3000;

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('./src/public'));
app.use('/', router);

app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
});