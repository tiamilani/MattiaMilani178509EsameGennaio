
const express = require('express'),
    bodyParser = require('body-parser');

const check = require('./checker.js');

const app = express();
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 5000));

// a useless function that returns a fixed object. you can use it, if you want, for testing purposes
app.get('/count',function (req, res) {
    res.json({count: 5})
})

app.post('/check',function (req, res) {
    const parameter = JSON.parse(req.body);
    check.check(parameter.url, parameter.invocationParameters, parameter.expectedResultData, parameter.expectedResultStatus)
        .then(result => {
            res.json(result)
        });
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
