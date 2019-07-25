var ws;

var beepArray = new Uint8Array(7);
beepArray[0] = 0x55;
beepArray[1] = 0x26;
beepArray[2] = 0xaa;
beepArray[3] = 0x00;
beepArray[4] = 0x01;
beepArray[5] = 0x01;
beepArray[6] = 0xe0;

function connect(e) {
    if (e.innerHTML == "Connect") {
        var address = document.getElementById("address").value;
        ws = new WebSocket(address);
        ws.binaryType = 'arraybuffer';
        ws.onopen = function() {
            console.log('Websocket is connected ...')
            document.getElementById("status").innerHTML = "Status: Connected";
            document.getElementById("btn").innerHTML = "Disconnect";
        }

        ws.onclose = function() {
            console.log('Websocket is disconnected ...')
            document.getElementById("status").innerHTML = "Status: Disconnected";
            document.getElementById("btn").innerHTML = "Connect";

        }

        ws.onmessage = function(ev) {


            var uint8Array = new Uint8Array(ev.data);
            const array = Array.from(uint8Array);

            if (array.length > 0 && array[0] != 0xDE && array[2] != 0xED) {
                addRow(bin2string(array))
                ws.send(beepArray.buffer);
            } else {

            }


        }

    } else {
        ws.close();
    }
}



function addRow(uid) {
    let tableRef = document.getElementById("preview")

    let newRow = tableRef.insertRow(-1)
    let uidCell = newRow.insertCell(0)

    let uidData = document.createTextNode(uid)

    uidCell.appendChild(uidData)
}

function bin2string(array) {
    var result = "";
    for (var i = 0; i < array.length - 1; ++i) {
        result += (String.fromCharCode(array[i]));
    }
    return result;
}