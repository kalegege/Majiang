/**
 * Created by kale on 2016/12/8.
 */
var InputLayer=ccui.Layout.extend({
    _backGroud:null,
    _textFiled:null,
    _close:null,

    ctor:function () {
        this._super();

        //加载背景
        this.loadBackground();
        //加载输入框
        this.loadTextField();

        //加载关闭符号
        this.loadButton(res.button_close_png,this.onButtonTouchEvent);
        this._close.setPosition(cc.p(300,200));

        var btn = new cc.Sprite(res.bg_input_up_png);
        // btn.x = cc.winSize.width *2;
        // btn.y = cc.winSize.height *2;
        btn.setPosition(cc.p(200,-100));
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

                Game.roomId =this._textFiled.getString();

                Game.op.joinRoom(Game.roomId,function (data) {
                    cc.log(data);
                    var _players = data.player;
                    for(var i= 0 ; i<_players.length;i++){
                        if(_players[i].id == Game.user.id){
                            Game.roomPosition = _players[i].position;
                        }
                    }
                    cc.director.runScene(new cc.TransitionFade(1, new GameScene()));
                });

                // cc.director.runScene(new cc.TransitionFade(1, new GameScene()));

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
        cc.eventManager.addListener(_btnListener, btn);

    },
    loadButton:function (texture,event) {
        this._close=new ccui.Button();
        this.addChild(this._close);
        this._close.loadTextures(texture,texture,"");
        this._close.setScale(1);
        this._close.setTouchEnabled(true);
        this._close.addTouchEventListener(event,this);
    },
    onButtonTouchEvent:function (sender,type) {
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                cc.log("关闭当前层");
                // this.removeFromParent();
                this.setVisible(false);
                break;
            case ccui.Widget.TOUCH_MOVED:
                cc.log("touch move");
                break;
            case ccui.Widget.TOUCH_ENDED:
                cc.log("touch up");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                cc.log("touch cancel");
                break;
            default:
                break;
        }
    },
    loadBackground:function () {
        this._backGroud=new ccui.ImageView(res.bg_input_png);
        this.addChild(this._backGroud);
    },
    loadTextField:function () {
        this._textFiled=new ccui.TextField("请输入语句:","Arial",30);
        this.addChild(this._textFiled);
        // var gPosition=this.convertToNodeSpace(cc.p(cc.winSize.width/2,cc.winSize.height/2));
        // this._textFiled.setPosition(gPosition);
        this._textFiled.setPosition(cc.p(0,50));
        this._textFiled.setString(Game.roomId);
        this._textFiled.addEventListener(this.onTextFieldEvent,this);
    },
    onTextFieldEvent:function (textField,type) {
        switch (type){
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                cc.log("挂载到输入法编辑器");
                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                cc.log("输入法编辑器--失去挂载");
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                cc.log("输入法编辑器--输入");
                break;
            case ccui.TextField.EVENT_DELETE_BACKWARD:
                cc.log("输入法编辑器--删除");
                break;
        }
    },
})
