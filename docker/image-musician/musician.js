
// Get the ip address and port information
const protocol = require('./musician-protocol')
// Using uuid module of Node.js
const uuid = require('uuid');
// We use a standard Node.js module to work with UDP
const dgram = require('dgram');
// Let's create a datagram socket. We will use it to send our UDP datagrams
const socket = dgram.createSocket('udp4');



// Create a measure object and serialize it to JSON
/*const measure = new Object();
measure.timestamp = Date.now();
measure.location = that.location;
measure.temperature = that.temperature;
const payload = JSON.stringify(measure);*/

// Creat a musician map and serialize it to JSON
const instruments = ["piano", "trumpet", "flute", "violin", "drum"];
const sounds = ["ti-ta-ti", "pouet", "trulu", "gzi-gzi", "boum-boum"];

if(instruments.length === sounds.length) {
    const mapOfInstruements = new Map();
    for (var i = 0; i < instruments; ++i) {
        mapOfInstruements.set(instruments[i], sounds[i])
    }
}

const musician = new Object();
musician.uuid = uuid.v4();
musician.instrument = instrument;
musician.sound = sound;

const payload = JSON.stringify(musician);
// Send the payload via UDP (multicast)
message = new Buffer(payload);
s.send(message, 0, message.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS,
    function(err, bytes) {
        console.log("Sending payload: " + payload + " via port " + socket.address().port);
    });