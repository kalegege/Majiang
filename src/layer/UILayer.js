/**
 * Created by kale on 2016/11/16.
 */

var UILayer = cc.Layer.extend({
    _setBtn: null,
    _chatBtn: null,
    _voiceBtn:null,
    _menuLayer:null,
    _endMenuLayer:null,
    _chatLayer:null,
    _default_message:null,
    _textFiled:null,

    ctor: function () {
        this._super();
        this.attr({
            x:1130,
            y:220,
            width:150,
            height:500
        });

        //加载音量设置层
        this._menuLayer=new MenuLayer2();
        this.addChild(this._menuLayer);
        var gPosition=this.convertToNodeSpace(cc.p(640,360));
        this._menuLayer.setPosition(gPosition);
        this._menuLayer.setVisible(false);
        this._menuLayer.retain();



        //加载设置按钮
        this._setBtn = new cc.Sprite(res.chat_setup_png);
        this._setBtn.setPositionX(this.width);
        this._setBtn.setPositionY(this.height);
        this._setBtn.setAnchorPoint(1.2,1.2);
        this.addChild(this._setBtn);


        //加载聊天按钮
        this._chatBtn = new cc.Sprite(res.chat_2_png);
        this._chatBtn.setPositionX(this.width);
        this._chatBtn.setPositionY(this.height *4 /6);
        this._chatBtn.setAnchorPoint(1.2,0.5);
        this.addChild(this._chatBtn);

        //加载聊天按钮
        this._voiceBtn = new cc.Sprite(res.chat_1_png);
        this._voiceBtn.setPositionX(this.width);
        this._voiceBtn.setPositionY(this.height *2.5 /6);
        this._voiceBtn.setAnchorPoint(1.2,0.5);
        this.addChild(this._voiceBtn);


        //加载聊天界面
        this._chatLayer=new ChatLayer();
        this.addChild(this._chatLayer);
        var gPosition=this.convertToNodeSpace(cc.p(640,360));
        this._chatLayer.setPosition(gPosition);
        this._chatLayer.setVisible(false);

        var _setupListener = cc.EventListener.create({
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

                console.log("began action" + target.y);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                this._menuLayer.setVisible(true);
                Sound.playBackgroundMusic();
                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });

        var _chatListener = cc.EventListener.create({
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

                console.log("began action" + target.y);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();



            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                //加载聊天界面
                // this._chatLayer=new ChatLayer();
                // this.addChild(this._chatLayer);
                // var gPosition=this.convertToNodeSpace(cc.p(640,360));
                // this._chatLayer.setPosition(gPosition);
                // this._chatLayer.setExit(this.loadMessage.bind(this));
                this._chatLayer.setVisible(true);

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });


        var _voiceListener = cc.EventListener.create({
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

                //开始录音
                if(cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID){
                    var ret=jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","RstartVoice","()Ljava/lang/String;");
                }

                console.log("began action" + target.y);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();

            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                //结束录音
                if(cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID){
                    var ret=jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","RendVoice","()Ljava/lang/String;");
                }

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });

        //加载设置按钮事件
        cc.eventManager.addListener(_setupListener, this._setBtn);
        //cc.eventManager.addListener(_chatListener, self._pauseBtn);
        cc.eventManager.addListener(_chatListener, this._chatBtn);
        //this._bindTouchEvent(this._pauseBtn);
        cc.eventManager.addListener(_voiceListener, this._voiceBtn);


    },
    loadMessage:function (message) {
        var self=this.getParent();
        self._infoLayer.loadMessage(message);
        self._infoLayer.setDirection(0);
        self._infoLayer.loadOtherMessage("其他人说的话",1);
        cc.log(message+"loadMessage");
    }

});



