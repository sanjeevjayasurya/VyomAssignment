const ACCOUNT_SID = 'AC720c55b6087f4576fce9b83c976d5175'
const AUTH_TOKEN = 'dc4579222456f040fa602800a63626c9'
const express = require('express')
const bodyParser = require('body-parser')
const twilio = require('twilio')(ACCOUNT_SID, AUTH_TOKEN)
const client = twilio
const Database = require('./db/db.config')
const Call = Database.call
const Op = Database.Sequelize.Op
const { NGROK_LINK } = require('./config')

Database.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

const app = express()

const server = app.listen(3000, () => {
    console.log('listening on port 3000');
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('static'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.post('/events', (req, res) => {
    let to = req.body.To;
    let fromNumber = req.body.From;
    let callStatus = req.body.CallStatus;
    let callSid = req.body.CallSid;

    io.emit('call progress event', { to, fromNumber, callStatus, callSid });
    res.send('Event received');
});

app.post('/voice', (req, res) => {
    client.makeCall({
        url: `${NGROK_LINK}/voice`,
        to: req.body.secondNumber,
        from: req.body.firstNumber,
        timeLimit: Number(req.body.duration) * 60,
        statusCallback: `${NGROK_LINK}/events`,
        statusCallbackMethod: 'POST',
        statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
    }, (err, call) => {
        if (err) { console.log(err); return err; }
        res.send(call.sid);
    });
})

app.post('/save', (req, res) => {
    const callDetails = {
        from: req.body.from,
        to: req.body.to,
        duration: req.body.duration
    }
    Call.create(callDetails)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occured in the databases"
            });
        });
})
