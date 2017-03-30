/**
 * Created by kale on 2016/11/15.
 */

var GameScene = cc.Scene.extend({

    _gameBackgroundLayer: null,
    _infoLayer: null,
    _UILayer: null,
    players: [],
    _userAction: null,
    ctor: function () {
        this._super();
        this.init();

        var layer = new cc.Layer();
        this.addChild(layer, 99);

        var _wxBtn = new cc.MenuItemImage(res.about_hsharmaLogo_png, res.about_hsharmaLogo_png, function () {
            this._downUser.drawCard(parseInt(Math.random() * 27 + 1));
        }, this);

        var _wxBtn2 = new cc.MenuItemImage(res.about_hsharmaLogo_png, res.about_hsharmaLogo_png, function () {

            // Game.op.pengCard(1);

        }, this);

        var _wxBtn3 = new cc.MenuItemImage(res.about_hsharmaLogo_png, res.about_hsharmaLogo_png, function () {
            // this._downUser.pong();
            Game.op.ready(Game.roomId, function (data) {
                cc.log(data);
                cc.log("准备。。。。");
            });
            _wxBtn3.setVisible(false);
        }, this);

        var menu = new cc.Menu(_wxBtn, _wxBtn2, _wxBtn3);
        menu.alignItemsInColumns(3);
        menu.y = 200;
        layer.addChild(menu, 99)

        //
        // var _cards = [];
        // for (var i = 1; i <= 13; i++) {
        //     // var _id = "x_" +  parseInt(Math.random()*27+1) + ".png";
        //     // var card = Card.create(parseInt(Math.random()*27+1) );
        //     _cards.push(parseInt(Math.random() * 27 + 1));
        // }

        // var self = this;
        // this._downUser = new UserLayer(DIRECTION.DOWN);
        // this._downUser.setCallback(this.cb.bind(this));
        // this.addChild(this._downUser);
        // this._downUser.dealCard(_cards);
        //
        // this._leftUser = new UserLayer(DIRECTION.LEFT);
        // this._leftUser.setCallback(this.cb.bind(this));
        // this.addChild(this._leftUser);
        // this._leftUser.dealCard(_cards);
        //
        // this._rightUser = new UserLayer(DIRECTION.RIGHT);
        // this._rightUser.setCallback(this.cb.bind(this));
        // this.addChild(this._rightUser);
        // this._rightUser.dealCard(_cards);
        //
        // this._upUser = new UserLayer(DIRECTION.UP);
        // this._upUser.setCallback(this.cb.bind(this));
        // this.addChild(this._upUser);
        // this._upUser.dealCard(_cards);

        return true;
    },
    init: function () {

        //加载背景层
        this._gameBackgroundLayer = new GameBackgroundLayer();
        this.addChild(this._gameBackgroundLayer);

        //加载提示信息层
        this._infoLayer = new InfoLayer();
        this.addChild(this._infoLayer);
        var list = [0, 1, 2, 3];
        this._infoLayer.loadPlayImages(list);
        this._infoLayer.loadText(Game.roomId, 136);

        //加载设置层
        this._UILayer = new UILayer();
        this.addChild(this._UILayer);

        //吃 碰 过
        this._userAction = new UserActionLayer();
        this.addChild(this._userAction, 900);
        var gPosition = this.convertToNodeSpace(cc.p(640, 360));
        this._userAction.setPosition(gPosition);
        this._userAction.setVisible(false);
    },
    onEnter: function () {
        this._super();
        Game.op.bindRoom(this);

        //连接融云服务器
        if(cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID){
            var ret=jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","initToken","(Ljava/lang/String;)V",Game.user.token);
        }
    },

    onExit: function () {
        Game.op.unbindRoom();
        this._super();
    },
    //发牌
    dealCard: function (data) {
        cc.log(data);
        if (data.playerInfos) {
            for (var i = 0; i < data.playerInfos.length; i++) {

                var pInfo = data.playerInfos[i];
                var _direction = DIRECTION.positionToDirection(pInfo.position);
                this.players[pInfo.position] = new UserLayer(_direction);
                this.addChild(this.players[pInfo.position], 101);

                var _cards = pInfo.cards;
                var _dealCard;
                for (var j = 0; j < _cards.length; j++) {
                    if (_cards[j].type == 0) {
                        if(_direction == DIRECTION.DOWN){
                            _dealCard = _cards[j].cards;
                        } else {
                            var _index = _cards[j].cardNum;
                            _dealCard = new Array();
                            while (_index-- > 0) {
                                _dealCard.push(0);
                            }
                        }
                        break;
                    }
                }
                cc.log(DIRECTION[_direction]);
                cc.log(_dealCard);
                this.players[pInfo.position].dealCard(_dealCard);
            }
        }

    },
    //抓牌
    drawCard: function (data) {
        if (data && data.playerInfos && data.playerInfos.length) {
            this._userAction.setVisible(false);
            var _player = data.playerInfos[0];
            this.players[_player.position].drawCard(_player.userid == Game.user.id ? _player.cards[0].cards[0] : 0);
            this._gameBackgroundLayer.changeStatus((_player.position));
            this._userAction.resetBackGround();
            this._gameBackgroundLayer.loadCount(10);
            this._infoLayer.setPokeText(data.leftDeskCardNum);
        }
    },
    //可以碰牌
    canPengCard: function (data) {
        cc.log(data);
        if (data.playerInfos[0].userid == Game.user.id) {
            var _player = data.playerInfos[0];
            this._userAction.pengAction(_player.cards[0].cards[0]);
            if (_player.cards.length > 1) {
                this._userAction.gangAction(_player.cards[0].cards[0]);
            }
            this._userAction.setVisible(true);
            // this.scheduleOnce(this._userAction.resetBackGround,2);
            // window.setInterval(function () {
            //     this._userAction.resetBackGround();
            // },2000);
            var action = cc.moveTo(0.5, 380, 350);
            this._userAction.runAction(action);
            //倒计时
            this._gameBackgroundLayer.loadCount(4);
        }
    },
    pengCard: function (data) {
        cc.log(data);
        for (var i = 0; i < data.playerInfos.length; i++) {
            var player = data.playerInfos[i];
            if (player.cards[0].type == 11) {
                this.players[player.position].pengCard(player);
            } else if (player.cards[0].type == 51) {
                this.players[player.position].removeCard();
            }
        }

        this._gameBackgroundLayer.changeStatus(player.position);
        this._gameBackgroundLayer.loadCount(10);
        this._infoLayer.setPokeText(data.leftDeskCardNum);
    },
    //吃牌
    canEatCard: function (data) {
        cc.log(data);
        if (data.playerInfos[0].userid == Game.user.id) {
            var _player = data.playerInfos[0];
            //加载提示框
            cc.log("canEatCard --:"+ _player.cards[0].cards);
            this._userAction.chiAction(_player.cards[0].cards);
            cc.log("可以吃的数组是——————————————————————：" + _player.cards[0].cards);
            this._userAction.setVisible(true);
            // this.scheduleOnce(this._userAction.resetBackGround,2);
            // window.setInterval(function () {
            //     this._userAction.resetBackGround();
            // },2000);
            var action = cc.moveTo(0.5, 380, 350);
            this._userAction.runAction(action);
            //倒计时
            this._gameBackgroundLayer.loadCount(4);
        }

    },
    chiCard: function (data) {
        cc.log("tips :   chi========");
        cc.log(data);
        for (var i = 0; i < data.playerInfos.length; i++) {
            var player = data.playerInfos[i];
            if (player.cards[0].type == 12) {
                this.players[player.position].chiCard(player);
                cc.log("已经吃的数组是——————————————————————：" + player.cards[0].cards);
                this._gameBackgroundLayer.changeStatus(player.position);
            } else if (player.cards[0].type == 53) {
                this.players[player.position].removeCard();
            }
        }

        this._gameBackgroundLayer.loadCount(10);
        this._infoLayer.setPokeText(data.leftDeskCardNum);
    },
    //强制出牌
    playCard: function (data) {
       
        cc.log(data);
        if (data && data.playerInfos && data.playerInfos.length) {
            var _player = data.playerInfos[0];
            this.players[_player.position].playCard(_player.cards[0].cards[0]);
        }
        this._userAction.resetBackGround();
        
    },
    autoPlayCard: function (data) {
        cc.log(data);
        if (data && data.playerInfos && data.playerInfos.length) {
            var _player = data.playerInfos[0];
            this.players[_player.position].autoPlayCard(_player.cards[0].cards[0]);
        }
        this._userAction.resetBackGround();
    },
    cb: function (direction) {
        this.scheduleOnce(function () {
            var card = parseInt(Math.random() * 27 + 1);
            switch (direction) {
                case DIRECTION.DOWN:
                    this._rightUser.drawCard(card);
                    break;
                case DIRECTION.RIGHT:
                    this._upUser.drawCard(card);
                    break;
                case DIRECTION.UP:
                    this._leftUser.drawCard(card);
                    break;
                case DIRECTION.LEFT:
                    this._downUser.drawCard(card);
                    break;
            }

            // if(direction!=DIRECTION.DOWN){
            this.cbPlayCard(direction);
            // }
        }, 1);

    },
    cbPlayCard: function (direction) {
        this.scheduleOnce(function () {
            var card = parseInt(Math.random() * 27 + 1);
            switch (direction) {
                case DIRECTION.DOWN:
                    this._rightUser.playCard(card);
                    break;
                case DIRECTION.RIGHT:
                    this._upUser.playCard(card);
                    break;
                case DIRECTION.UP:
                    this._leftUser.playCard(card);
                    break;
                case DIRECTION.LEFT:
                    break;
            }
        }, 1);
    }
});
