/**
 * Created by foo on 2016/12/1.
 */



var OpManager = cc.Class.extend({

    connect: null,
    builder: null,
    _connected: null,
    _loginFinish: null,
    _builders: null,
    _roomScene: null,
    // _listener:null,
    ctor: function () {
        // this.builder = dcodeIO.ProtoBuf.loadProtoFile("res/proto/PlayerModule.proto");
        // this._builders = {};
        this.connect = new ConnectManager();
        this.connect.bindListener(this._onMessage.bind(this));
    },
    connection: function (callback) {
        this.connect.connect().then(callback);
    },
    login: function (username, callback) {
        this._loginFinish = callback;

        this.connect.sendMessage({
            module: OpManager.MODULE.LOGIN,
            cmd: OpManager.CMD.WEIXINLOGIN,
            data: {wId: username}
        }).then(function (data) {

            var d = eval("("+data.data+")");

            // cc.log("登陆成功。。。");
            // this._loginFinish && this._loginFinish(this.decode(OpManager.BUILD.USERRESPONSE, data.data));
            this._loginFinish && this._loginFinish(d);
        }.bind(this));

        // this.connect.sendMessage({
        //     module: OpManager.MODULE.LOGIN,
        //     cmd: OpManager.CMD.WEIXINLOGIN,
        //     data: {wId: username}
        // }, function (data) {
        //     // cc.log("登陆成功。。。");
        //     this._loginFinish && this._loginFinish(this.decode(OpManager.BUILD.USERRESPONSE, data.data));
        // }.bind(this));
    },
    onError: function (evt) {

    },
    joinRoom: function (roomId, callback) {
        this.connect.sendMessage({
                module: OpManager.MODULE.PLAYER,
                cmd: OpManager.CMD.INTOROOM,
                data: {id: Game.user.id, roomId: roomId}
            }).then(function (data) {
                if (data.stateCode == OpManager.STATECODE.ROOMFUlL) {
                    cc.log("房间已满或该用户已进入");
                } else {
                    cc.log("进入房间。。。");
                    var d = eval("("+data.data+")");
                    callback && callback(d);
                    // callback && callback(this.decode(OpManager.BUILD.ROOMRESPONSE, data.data));
                }
            }.bind(this));
    },
    bindRoom: function (scene) {
        this._roomScene = scene;
    },
    unbindRoom: function () {
        this._roomScene = null;
    },
    playCard: function (card) {
        this.connect.sendMessage({
            module: OpManager.MODULE.PLAYER,
            cmd: OpManager.CMD.PLAYCARD,
            data: {
                id: Game.user.id,
                roomId: Game.roomId,
                outCard:card
            }
        }).then(function(data){
            cc.log("出牌完成！！！！");
            cc.log(data);
        });
    },
    pengCard:function (card) {
        cc.log("connect peng"+card);
        this.connect.sendMessage({
            module: OpManager.MODULE.PLAYER,
            cmd: OpManager.CMD.PENG,
            data: {
                id: Game.user.id,
                roomId: Game.roomId,
                card:card
            }
        }).then(function(data){
            cc.log("碰牌完成！！！！");
            cc.log(data);
        });
    },
    chiCard:function (card) {
        cc.log("connect chi"+card);
        this.connect.sendMessage({
            module: OpManager.MODULE.PLAYER,
            cmd: OpManager.CMD.CHI,
            data: {
                id: Game.user.id,
                roomId: Game.roomId,
                card:card
            }
        }).then(function(data){
            cc.log("吃牌完成！！！！");
            cc.log(data);
        });
    },
    gangCard:function (card) {
        this.connect.sendMessage({
            module: OpManager.MODULE.PLAYER,
            cmd: OpManager.CMD.GANG,
            data: {
                id: Game.user.id,
                roomId: Game.roomId,
                card:card
            }
        }).then(function(data){
            cc.log("杠牌完成！！！！");
            cc.log(data);
        });
    },
    ready: function (roomId, callback) {
        this.connect.sendMessage({
            module: OpManager.MODULE.PLAYER,
            cmd: OpManager.CMD.READY,
            data: {
                id: Game.user.id,
                roomId: roomId
            }
        }).then(function (data) {
            var d = eval("("+data.data+")");
            callback && callback(d);
            // callback && callback(this.decode(OpManager.BUILD.ROOMRESPONSE, data.data));
        }.bind(this));
    },
    _onMessage:function (data) {
        var d =eval("("+data.data+")");
        switch (data.cmd){
            case OpManager.CMD.DEALCARD:
                // this.decode(OpManager.BUILD.ROOMOPERATIONINFORESPONSE,data.data);
                this._roomScene.dealCard(d);
                break;
            case OpManager.CMD.DRAWCARD:
                this._roomScene.drawCard(d);
                break;
            case OpManager.CMD.PLAYCARD:
                this._roomScene.playCard(d)
                break;
            case OpManager.CMD.AUTOPLAYCARD:
                this._roomScene.autoPlayCard(d);
                break;
            case OpManager.CMD.CANPENG:
                this._roomScene.canPengCard(d);
                break;
            case OpManager.CMD.CANEAT:
                this._roomScene.canEatCard(d);
                break;
            case OpManager.CMD.PENG:
                this._roomScene.pengCard(d);
                break;
            case OpManager.CMD.CHI:
                this._roomScene.chiCard(d);
                break;
        }
        cc.log("_onMessage");
        cc.log(d);
    },
    decode: function (build, data) {
        if (!this._builders[build]) {
            this._builders[build] = this.builder.build(build);
        }
        return this._builders[build].decode(dcodeIO.ByteBuffer.fromBase64(data));
    }
});


OpManager.BUILD = {
    ROOMRESPONSE: "RoomResponse",
    USERRESPONSE: "UserResponse",
    ROOMOPERATIONINFORESPONSE:"RoomOperationInfoResponse"
};

OpManager.CMD = {
    /**
     * 微信登录
     */
    WEIXINLOGIN: 1,
    /**
     * 进入房间
     */
    INTOROOM: 2,
    /**
     * 创建房间
     */
    CREATEROOM: 3,
    /**
     * 准备
     */
    READY: 4,
    /**
     * 发牌
     */
    DEALCARD:5,
    /**
     * 出牌
     */
    PLAYCARD:11,
    /**
     * 抓牌
     */
    DRAWCARD:12,
    /**
     * 强制出牌
     */
    AUTOPLAYCARD:13,
    /**
     * 碰
     */
    PENG : 14,
    /**
     * 吃
     */
    CHI : 15,
    /**
     * 杠
     */
    GANG : 16,
    /**
     * 不碰
     */
    NOPENG : 17,
    /**
     * 不吃
     */
    NOCHI : 18,

    /**
     * 可以碰
     */
    CANPENG : 21,
    /**
     * 可以吃
     */
    CANEAT : 22,

    /**
     * 退出
     */
    OUT : 0,




    /**
     * 退出房间
     */
    OUT: 99
};

OpManager.MODULE = {
    /**
     * 登陆
     */
    LOGIN: 1,
    /**
     * 用户
     */
    PLAYER: 2
};


OpManager.STATECODE = {
    /**
     * 成功
     */
    SUCCESS: 0,
    /**
     * 找不到命令
     */
    NO_INVOKER: 1,
    /**
     * 参数异常
     */
    AGRUMENT_ERROR: 2,
    /**
     * 未知异常
     */
    UNKOWN_EXCEPTION: 3,
    /**
     * 玩家名或密码不能为空
     */
    PLAYERNAME_NULL: 4,
    /**
     * 玩家名已使用
     */
    PLAYER_EXIST: 5,
    /**
     * 玩家不存在
     */
    PLAYER_NO_EXIST: 6,
    /**
     * 未找到房间
     */
    ROOM_UNDEFIND: 7,
    /**
     * 您已登录
     */
    HAS_LOGIN: 8,
    /**
     * 登录失败
     */
    LOGIN_FAIL: 9,
    /**
     * 玩家不在线
     */
    PLAYER_NO_ONLINE: 10,
    /**
     * 请先登录
     */
    LOGIN_PLEASE: 11,
    /**
     * 房间已满或该用户已进入
     */
    ROOMFUlL: 12,
    /**
     * 未准备
     */
    UNREADY: 13
};

Game.op = new OpManager();
