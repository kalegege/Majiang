/**
 * Created by foo on 2016/11/15.
 */



var LoginLayer = cc.Layer.extend({
    sprite: null,
    _wxBtn: null,
    _textFiled:null,
    _inputLayer:null,
    ctor: function () {
        this._super();

        var winSize = cc.director.getWinSize();
        this.sprite = new cc.Sprite(res.login_jpg);
        this.sprite.x = winSize.width / 2;
        this.sprite.y = winSize.height / 2;
        this.addChild(this.sprite);

        //加载音量设置层
        this._inputLayer=new ServerLayer();
        this.addChild(this._inputLayer);
        var gPosition=this.convertToNodeSpace(cc.p(640,360));
        this._inputLayer.setPosition(gPosition);
        this._inputLayer.setVisible(false);
        this._inputLayer.retain();



        this._wxBtn = new cc.MenuItemImage(res.about_hsharmaLogo_png, res.about_hsharmaLogo_png, this._wxLogin);
        var btns = [], btns2 = [];

        btns.push(this._wxBtn);

        var menu = new cc.Menu(btns);
        menu.y = 150;
        this.addChild(menu);


        var btn = new cc.Sprite(res.chat_setup_png);
        btn.x = winSize.width *3/ 4;
        btn.y = winSize.height *3/ 4;
        this.addChild(btn);

        var _btnListener = cc.EventListener.create({
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
                cc.log("press button");

                console.log("began action" + target.y);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                this._inputLayer.setVisible(true);
                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });

        //加载设置按钮事件
        cc.eventManager.addListener(_btnListener, btn);


        return true;
    },
    _wxLogin: function () {
        cc.log("login");
        cc.director.runScene(new cc.TransitionFade(1, new MenuScene()));
    }
});


var LoginScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new LoginLayer();
        this.addChild(layer);
    },
    onExit: function () {
        console.log("loginScene exit");
    }
});