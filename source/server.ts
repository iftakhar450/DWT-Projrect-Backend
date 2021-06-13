import app from "./app";
import config from './config/config';
var chalk = require('chalk');
var running = chalk.bold.yellow;

/**  Routes */
app.get('/', (req, res) => {
    res.json("DWT Backend Running");
});
app.use((req, res, next) => {
    const error = new Error('Not Found');
    return res.status(404).json(error.message);
})


app.listen(config.server.port, () => {
    console.log(running('Express server listening on port ' + config.server.port));
})
