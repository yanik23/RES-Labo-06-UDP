
// Get the ip address and port information
const protocol = require('./musician-protocol')
// Using uuid module of Node.js
const uuid = require('uuid');
// We use a standard Node.js module to work with UDP
const dgram = require('dgram');
// Let's create a datagram socket. We will use it to send our UDP datagrams
const socket = dgram.createSocket('udp4');

//Creating an object by Mapping the sounds to every instrument
const MAP_OF_SOUNDS = {
    piano: 'ti-ta-ti',
    trumpet: 'pouet',
    flute: 'trulu',
    violin: 'gzi-gzi',
    drum: 'boum-boum'
}
function Musician(instrument) {
    const musician = new Object();
    musician.id = uuid.v4();
    musician.instrument = instrument;
    musician.sound = MAP_OF_SOUNDS[instrument];

    const payload = JSON.stringify(musician);

    message = new Buffer(payload);

    // Send the payload via UDP (multicast)
    Musician.prototype.sendSound = function()
    {
        socket.send(message, 0, message.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS,
            function (err, bytes) {
                console.log("Sent payload: " + payload + " via port " + protocol.PROTOCOL_PORT);
            });
    }
    //Let's take and send a musician every 1 seconds.
    setInterval(this.sendSound.bind(this), 1000);
}

var myArgs = process.argv.slice(2);

//if the number of arguments aren't right or the name of the instrument isn't in the map, we send an error message.
//else we create the musician.
if(process.argv.length != 3 || !(myArgs in MAP_OF_SOUNDS)){
     console.log("Number of parameters invalid");
}
else {
    var musician = new Musician(myArgs);
}