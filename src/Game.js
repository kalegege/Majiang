/**
 * Created by foo on 2016/11/30.
 */



var Game = {

    // server:"ws://125.210.141.30:8088/websocket",
    // server:"ws://127.0.0.1:8088/websocket",
    // server:"ws://10.1.1.105:8088/websocket",
    server:"ws://10.88.48.189:8088/websocket",

    user: {id:5},

    gameRoom: null,

    connect: null,

    op: null,

    roomId: "1",

    userPosition:null

};

Game.getUdid = function () {
    return 'xxxxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
};

Game.setServer = function (server) {
    // sys.localStorage.setItem("game.server" ,string);
};

