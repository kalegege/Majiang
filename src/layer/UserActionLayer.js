/**
 * Created by Wasu on 16/12/13.
 */

var UserActionLayer=ccui.Layout.extend({
    _gang:null,
    _peng:null,
    _chi:null,
    _hu:null,
    _cancel:null,
    _gangListener:null,
    _pengListener:null,
    _chiListener:null,
    _huListener:null,
    _cancelListener:null,
    _gangBackground:null,
    _pengBackground:null,
    _chiBackground:null,
    _huBackground:null,
    _cancelBackground:null,

    _gangCards:[],
    _chiCards:[],
    _pengCards:[],


    ctor:function () {
        this._super();

        this.loadBackGround();
        this.loadText();
        this._gang.setPosition(520,-160);
        this._peng.setPosition(600,-160);
        this._chi.setPosition(680,-160);
        this._hu.setPosition(760,-160);
        this._cancel.setPosition(840,-160);

        this.initListener();

    },
    loadText:function () {
        this._gang=new cc.LabelTTF("杠","杠",28,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._gang.setPositionX(this.width/2);
        this._gang.setPositionY(this.height/2);
        // this._gang.setColor(cc.color(0,0,0));
        this.addChild(this._gang,900);

        this._peng=new cc.LabelTTF("碰","碰",28,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._peng.setPositionX(this.width/2);
        this._peng.setPositionY(this.height/2);
        // this._peng.setColor(cc.color(0,0,0));
        this.addChild(this._peng);

        this._chi=new cc.LabelTTF("吃","吃",28,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._chi.setPositionX(this.width/2);
        this._chi.setPositionY(this.height/2);
        // this._chi.setColor(cc.color(0,0,0));
        this.addChild(this._chi,900);

        this._hu=new cc.LabelTTF("胡","胡",28,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._hu.setPositionX(this.width/2);
        this._hu.setPositionY(this.height/2);
        // this._hu.setColor(cc.color(0,0,0));
        this.addChild(this._hu,900);

        this._cancel=new cc.LabelTTF("过","过",28,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._cancel.setPositionX(this.width/2);
        this._cancel.setPositionY(this.height/2);
        //this._cancel.setColor(cc.color(0,0,0));
        this.addChild(this._cancel,900);


    },
    loadBackGround:function () {
        this._gangBackground = new ccui.ImageView(res.logo_bg);
        this._gangBackground.setPosition(520, -160);
        this._gangBackground.setScale(0.35);
        this.addChild(this._gangBackground);
        this._gangBackground.setVisible(false);

        this._pengBackground = new ccui.ImageView(res.logo_bg);
        this._pengBackground.setPosition(600, -160);
        this._pengBackground.setScale(0.35);
        this.addChild(this._pengBackground);
        this._pengBackground.setVisible(false);

        this._chiBackground = new ccui.ImageView(res.logo_bg);
        this._chiBackground.setPosition(680, -160);
        this._chiBackground.setScale(0.35);
        this.addChild(this._chiBackground);
        this._chiBackground.setVisible(false);

        this._huBackground = new ccui.ImageView(res.logo_bg);
        this._huBackground.setPosition(760, -160);
        this._huBackground.setScale(0.35);
        this.addChild(this._huBackground);
        this._huBackground.setVisible(false);

        this._cancelBackground = new ccui.ImageView(res.logo_bg);
        this._cancelBackground.setPosition(840, -160);
        this._cancelBackground.setScale(0.35);
        this.addChild(this._cancelBackground);
        // this._cancelBackground.setVisible(false);

    },

    initListener:function () {

        this._gangListener = cc.EventListener.create({
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

                //发送杠提示
                Game.op.gangCard(this._gangCards);

                this.setVisible(false);
                var action=cc.moveTo(0.1,680,350);
                this.runAction(action);
                this.resetBackGround();

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });

        this._pengListener = cc.EventListener.create({
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
                cc.log("press peng button");

                Game.op.pengCard(this._pengCards);

                console.log("began action" + target.y);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                //发送碰提示
                // Game.op.pengCard(card);

                //弹框消失
                this.setVisible(false);
                var action = cc.moveTo(0.1, 680, 350);
                this.runAction(action);
                this.resetBackGround();

                target.setScale(1);
                console.log("peng Ended");
            }.bind(this)
        });

        this._chiListener = cc.EventListener.create({
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

                Game.op.chiCard(this._chiCards);

                console.log("began action" + target.y);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                this.setVisible(false);
                var action = cc.moveTo(0.1, 680, 350);
                this.runAction(action);
                this.resetBackGround();

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });

    },
    gangAction:function(card){
        this._gangBackground.setVisible(true);
        this._gangCards=card;
        cc.eventManager.addListener(this._gangListener, this._gang);
    },
    pengAction:function (card) {
        this._pengBackground.setVisible(true);
        this._pengCards = card;
        cc.eventManager.addListener(this._pengListener, this._peng);
    },
    chiAction:function(card){
        cc.log("chiAction ====:"+ card);
        this._chiBackground.setVisible(true);
        this._chiCards = card;
        cc.eventManager.addListener(this._chiListener, this._chi);
    },
    huAction:function(){
        this.loadBackground4();
        this._huListener = cc.EventListener.create({
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
                this.setVisible(false);
                var action = cc.moveTo(0.1, 680, 350);
                this.runAction(action);
                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });
        //加载设置按钮事件
        // cc.eventManager.addListener(this._huListener, this._hu);
    },
    cancelAction:function(){
        this._cancelBackground.setVisible(true);
        this._cancelListener = cc.EventListener.create({
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
                this.setVisible(false);
                this.resetBackGround();
                var action = cc.moveTo(0.1, 680, 350);
                this.runAction(action);
                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });
        //加载设置按钮事件
        // cc.eventManager.addListener(this._cancelListener, this._cancel);
    },
    resetBackGround:function () {
        if(this._gangBackground.isVisible()){
            cc.eventManager.removeListener(this._gangListener);
        }
        this._gangBackground.setVisible(false);

        if(this._pengBackground.isVisible()){
            cc.eventManager.removeListener(this._pengListener);
        }
        this._pengBackground.setVisible(false);

        if(this._chiBackground.isVisible()){
            cc.eventManager.removeListener(this._chiListener);
        }
        this._chiBackground.setVisible(false);


    },

});