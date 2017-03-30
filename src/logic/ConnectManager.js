/**
 * Created by foo on 2016/11/24.
 */


var ConnectManager = cc.Class.extend({
    websocket: null,
    userid: null,
    builder: null,
    _onOpen: null,
    _onError: null,
    _callbacks: null,
    _onMessage: null,
    _requestId: 0,
    _listener: [],
    ctor: function (onOpen) {
        // this._onOpen = onOpen;
        // this._init();
        this._callbacks = {};
    },
    connect: function () {
        // this.builder = dcodeIO.ProtoBuf.loadProtoFile("res/proto/PlayerModule.proto");

        var deferred = Q.defer();
        this._callbacks["connection"] = deferred;
        this.websocket = new WebSocket(Game.server);
        this.websocket.onopen = this.onOpen.bind(this);
        this.websocket.onclose = this.onClose.bind(this);
        this.websocket.onmessage = this.onMessage.bind(this);
        this.websocket.onerror = this.onError.bind(this);
        return deferred.promise.then(function (response) {
            return response;
        });

    },
    bindListener: function (listener) {
        this._listener.push(listener);
    },
    onOpen: function (evt) {

        var callback = this._callbacks["connection"];
        if (callback instanceof Q.defer) {
            delete this._callbacks["connection"];
            callback.resolve(evt);
            // callback(data);
        }
        this._onOpen && this._onOpen(evt);
    },
    onClose: function (evt) {
        cc.log(evt);
        cc.log("Disconnected");
    },
    onMessage: function (evt) {

        var data = JSON.parse(evt.data);
        // cc.log(data);



        // data = JSON.parse(data.data);

        var callback = this._callbacks[data.responseId];
        if (callback instanceof Q.defer) {
            delete this._callbacks[data.responseId];
            callback.resolve(data);
            // callback(data);
        } else {

            if (this._listener && this._listener.length > 0) {
                for (var i = 0; i < this._listener.length; i++) {
                    var _l = this._listener[i];
                    if (_l && typeof(_l) == "function") {
                        if (_l(data)) break;
                    }
                }
            }

            // this._onMessage && this._onMessage(data);
        }
    },
    onError: function (evt) {
        cc.log('Error occured: ' + evt.data);
    },
    sendMessage: function (data) {
        var deferred = Q.defer();
        data["requestId"] = this._getRequestId();
        this._callbacks[data.requestId] = deferred;
        this.websocket.send(JSON.stringify(data));
        return deferred.promise.then(function (response) {
            data.response = response;
            return response;
        });
    },
    _getRequestId: function () {
        return 'xxxxxx'.replace(/[x]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
        // return new Date().getTime();
    }
});


ConnectManager.connect = function () {

    if (!Game.connect) {
        Game.connect = new ConnectManager();
    }


};

//
// ConnectManager.CMD = {
//     LOGIN: 1,
//     JOINROOM: 2
// };
// ConnectManager.MODULE = {
//     PLAYER: 2,
//     CARD: 1
// };
// ConnectManager.STATUS = {};
