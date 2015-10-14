;(function(){
    var Chat = {
        socket: null
    };
    Chat.connect = function (host) {
        if('WebSocket' in window) {
            this.socket = new WebSocket(host);
        } else if('MozWebSocket' in window) {
            this.socket = new MozWebSocket(host);
        } else {
            console.log('Websocket is not supported');
            alert('Websocket is not supported');
        }
        
        this.socket.onopen = function () {
            console.log('open');
            this.sendMessage();
        };

        this.socket.onclose = function () {
            console.log('closewww');
        };

        this.socket.onmessage = function (message) {
            console.log(message.data);
        };
    };

    Chat.init = function(){
        if (window.location.protocol == 'http:') {
            Chat.connect('ws://' + window.location.host);
        } else {
            Chat.connect('wss://' + window.location.host);
        }
    };

    Chat.sendMessage = (function() {
        var message = document.getElementById('input').value;
        if (message != '') {
            this.socket.send(message);
            document.getElementById('input').value = '';
        }
    });

    window.Chat = Chat;
})();

