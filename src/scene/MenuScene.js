/**
 * Created by foo on 2016/11/15.
 */




var MenuLayer = cc.Layer.extend({
    sprite: null,
    _joinRoomBtn: null,
    _createRoomBtn: null,
    _setupLayer:null,
    _confirm:null,
    ctor: function () {
        this._super();
        var winSize = cc.director.getWinSize();
        this.sprite = new cc.Sprite(res.menu_jpeg);
        this.sprite.x = winSize.width / 2;
        this.sprite.y = winSize.height / 2;
        this.addChild(this.sprite);

        //加载按钮
        this.loadBtns();

        //加载设置层
        // this._setupLayer=new InputLayer();
        // this.addChild(this._setupLayer);
        // var gPosition=this.convertToNodeSpace(cc.p(640,360));
        // this._setupLayer.setPosition(gPosition);
        // this._setupLayer.setVisible(false);
    },

    onEnter: function () {
        this._super();

        Game.op.connection(function (evt) {
            cc.log("服务器连接成功。。。。");
            // cc.log(evt);
            // Game.getUdid()
            var uid = Game.getUdid();
            // var uid = "3c6b24";
            Game.op.login(uid, function (data) {
                Game.user = data;

                cc.log(data);
                cc.log("用户登陆成功。。。。 id: "+ data.id);
            });
        });

        this._confirm=new ConfirmLayer();
        this.addChild(this._confirm);
        this._confirm.setVisible(false);
        this._confirm.setPosition(cc.p(cc.winSize.width*2,cc.winSize.height*2));
    },
    loadBtns:function () {
        var btn1 = new cc.Sprite(res.about_hsharmaLogo_png);
        btn1.setPosition(cc.p(550,360));
        this.addChild(btn1);

        var btn2 = new cc.Sprite(res.about_hsharmaLogo_png);
        btn2.setPosition(cc.p(1000,360));
        this.addChild(btn2);

        var _btn1Listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var posInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0, 0, size.width, size.width);
                if (!(cc.rectContainsPoint(rect, posInNode))) {
                    return false;
                }
                cc.log("createroom");
                this._confirm.setVisible(true);
                this._confirm.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
                this._confirm.loadInfo(0);

                console.log("began action" + target.y);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });

        var _btn2Listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var posInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0, 0, size.width, size.width);
                if (!(cc.rectContainsPoint(rect, posInNode))) {
                    return false;
                }

                cc.log("joinroom");
                this._confirm.setVisible(true);
                this._confirm.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
                this._confirm.loadInfo(1);

                console.log("began action" + target.y);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });
        //加载设置按钮事件
        cc.eventManager.addListener(_btn1Listener, btn1);
        cc.eventManager.addListener(_btn2Listener, btn2);

    },
    // _onJoinRoom: function () {
    //     cc.log("joinroom");
    //     Game.op.joinRoom(Game.roomId,function (data) {
    //         cc.log(data);
    //         var _players = data.player;
    //         for(var i= 0 ; i<_players.length;i++){
    //             if(_players[i].id == Game.user.id){
    //                 Game.userPosition = _players[i].position;
    //             }
    //         }
    //         //开始录音
    //         if(cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID){
    //             var ret=jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","initToken","(Ljava/lang/String;)V",Game.user.token);
    //         }
    //         cc.director.runScene(new cc.TransitionFade(1, new GameScene()));
    //     });
    // },
    // _onCreateRoom: function () {
    //     cc.log("createroom");
    //
    //     // this._setupLayer.setVisible(true);
    //     this._confirm.setVisible(true);
    //     this._confirm.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
    //     this._confirm.loadInfo();
    //     // cc.director.runScene(new cc.TransitionFade(1, new GameScene()));
    // }

});


var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});