const dgram = require('dgram')
const net = require('net')
const protocol = require('./musician-protocol')
const moment = require('moment')

const TCP_PORT = 2210
const TIMEOUT = 5

const socket = dgram.createSocket('udp4');

socket.bind(protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS, () => {
    console.log("joining multicast group")
    socket.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS)
})


var uniqueMusicians = new Map()
/**
 * On message received
 */
socket.on('message', (data,info) => {
    const json_object_data = JSON.parse(data.toString())

    //set active since 
    const lastEmitted = moment().toISOString()
    const active_since = uniqueMusicians.has(json_object_data.uuid) ? uniqueMusicians.get(json_object_data.uuid).active_since :lastEmitted

    //using a map to avoid duplicate keys (UUID)
    uniqueMusicians.set(json_object_data.uuid, { 
        instrument : json_object_data.instrument,
        active_since : active_since,
        last_active : lastEmitted
    })

})
function purgeTimedOut(){
    //check musician activity with current time and current
    //remove him if he has not been active for 5 seconds
    uniqueMusicians.forEach((value,key) => {

        //get difference in seconds
        if(moment().diff(value.last_active, 's') >  TIMEOUT){
            uniqueMusicians.delete(key)
        }
    })

}
function sendTCPResponse(socket){
    purgeTimedOut();

    var resp = [];

    uniqueMusicians.forEach((v,k) => {
        resp.push({
            uuid : k,
            instrument : v.instrument,
            last_active : v.last_active
        })
    })

    socket.write(JSON.stringify(resp))
    socket.end()
}

/***TCP SERVER */
TCP_Serv = net.Server();
// The server listens to a socket for a client to make a connection request.
TCP_Serv.listen(TCP_PORT, function() {
    console.log("Listening for connection on" + TCP_PORT + ".");
});

//when a client connects via TCP
TCP_Serv.on('connection', function(socket){
    sendTCPResponse(socket)
})

