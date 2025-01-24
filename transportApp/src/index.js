const app = require('./app');

app.listen(app.get('port'), () => {
    console.log("Server runing on port: ",app.get('port'))
})