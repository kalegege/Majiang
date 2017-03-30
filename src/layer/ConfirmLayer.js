
/**
 * Created by kale on 2016/12/15.
 */
var ConfirmLayer=ccui.Layout.extend({
    _backGround:null,
    _create:null,
    _cancle:null,
    _info:null,
    _textFiled:null,
    _createListener:null,
    _cancleListener:null,

    ctor:function () {
        this._super();

        this._backGround=new ccui.ImageView(res.bg_input_png);
        this.addChild(this._backGround);



        this._create=new cc.LabelTTF("","Arial",28,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._create.setPositionX(this.width/2-100);
        this._create.setPositionY(this.height/2);
        // this._gang.setColor(cc.color(0,0,0));
        this.addChild(this._create);

        this._createListener = cc.EventListener.create({
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

                if(this._textFiled != null){
                    Game.roomId=this._textFiled.getString();
                }

                cc.log("joinroom");
                Game.op.joinRoom(Game.roomId,function (data) {
                    cc.log(data);
                    var _players = data.player;
                    for(var i= 0 ; i<_players.length;i++){
                        if(_players[i].id == Game.user.id){
                            Game.userPosition = _players[i].position;
                        }
                    }
                    cc.director.runScene(new cc.TransitionFade(1, new GameScene()));
                });

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });
        //加载设置按钮事件


        this._cancle=new cc.LabelTTF("取消","Arial",28,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._cancle.setPositionX(this.width/2+100);
        this._cancle.setPositionY(this.height/2);
        // this._gang.setColor(cc.color(0,0,0));
        this.addChild(this._cancle);

        this._cancleListener = cc.EventListener.create({
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

                //进入房间
                this.setVisible(false);
                cc.eventManager.removeListener(this._createListener);
                cc.eventManager.removeListener(this._cancleListener);

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });
        //加载设置按钮事件

        this._info=new cc.LabelTTF("","Arial",28,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._info.setPositionX(this.width/2);
        this._info.setPositionY(this.height/2+50);
        // this._gang.setColor(cc.color(0,0,0));
        this.addChild(this._info);

    },
    loadInfo:function (flag) {
        if(flag == 0){
            this._create.setString("创建房间");
            this._info.setString("房卡数量："+Game.user.roomCard);
        }else if(flag == 1){
            this._create.setString("加入房间");
            this._info.setString("");

            this.loadTextField();
        }
        cc.eventManager.addListener(this._cancleListener,this._cancle);
        cc.eventManager.addListener(this._createListener,this._create);


        // this._create.setTouchEnabled(true);
        // this._cancle.setTouchEnabled(true);
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
