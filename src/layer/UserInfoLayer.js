/**
 * Created by Wasu on 16/12/13.
 */


var UserInfoLayer=ccui.Layout.extend({
    _backGround:null,
    _backGround2:null,
    _icon:null,
    _close:null,
    _name:null,
    _id:null,
    _lever:null,
    _ip:null,
    _money:null,
    _loveliness:null,
    _winCount:null,
    _totalCount:null,

    ctor:function () {
        this._super();
        //加载背景
        this.loadBackground();
        //加载文本
       this.loadText("小萝莉白又白",123446,1,"127.0.0.1",10000,10);
        this._name.setPosition(cc.p(-30,150));
        this._id.setPosition(cc.p(155,150));
        this._lever.setPosition(-90,100);
        this._ip.setPosition(160,100);
        this._money.setPosition(-65,50);
        this._loveliness.setPosition(150,50);

        this._winCount.setPosition(-150,-10);
        this._totalCount.setPosition(150,-10);
        //加载关闭符号
        this.loadButton(res.button_close_png,this.onButtonTouchEvent);
        this._close.setPosition(cc.p(300,200));
        //加载用户头像
        this.loadImage()



    },

    loadBackground:function () {
        this._backGround=new ccui.ImageView(res.background_userInfo);
        this.addChild(this._backGround);

        this._backGround2=new ccui.ImageView(res.background_userInfo2);
        this._backGround2.setPosition(0,-80);
        this.addChild(this._backGround2)
    },
    loadButton:function (texture,event) {
        this._close=new ccui.Button();
        this.addChild(this._close)
        this._close.setScale(0.5);
        this._close.loadTextures(texture,texture,"");
        this._close.setTouchEnabled(true);
        this._close.addTouchEventListener(event,this);
    },
    onButtonTouchEvent:function (sender, type) {
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                cc.log("关闭当前层");
                //this.removeFromParent();
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
    loadImage:function () {
      this._icon=new ccui.ImageView(res.fate_019_png);
      this._icon.setPosition(cc.p(-210,120));
      this.addChild(this._icon);
    },

    loadText:function (name,id,lever,ip,money,loveLiness) {
        this._name=new cc.LabelTTF("昵称："+name,"Arial",22,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

        this._name.setPositionX(this.width/2);
        this._name.setPositionY(this.height/2);
        this.addChild(this._name);

        this._id=new cc.LabelTTF("ID："+id,"0",22,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._id.setPositionX(this.width/2);
        this._id.setPositionY(this.height/2);
        this.addChild(this._id);

        this._lever=new cc.LabelTTF("等级："+lever,"0",22,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._lever.setPositionX(this.width/2);
        this._lever.setPositionY(this.height/2);
        this.addChild(this._lever);

        this._ip=new cc.LabelTTF("IP："+ip,"127.0.0.1",22,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._ip.setPositionX(this.width/2);
        this._ip.setPositionY(this.height/2);
        this.addChild(this._ip);

        this._money=new cc.LabelTTF("金币："+money,"0",22,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._money.setPositionX(this.width/2);
        this._money.setPositionY(this.height/2);
        this.addChild(this._money);

        this._loveliness=new cc.LabelTTF("魅力值："+loveLiness,"0",22,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._loveliness.setPositionX(this.width/2);
        this._loveliness.setPositionY(this.height/2);
        this.addChild(this._loveliness);

        this._winCount=new cc.LabelTTF("胜利局数：","0",26,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._winCount.setPositionX(this.width/2);
        this._winCount.setPositionY(this.height/2);
       this._winCount.setColor(cc.color(0,0,0));
        this.addChild(this._winCount);

        this._totalCount=new cc.LabelTTF("总局数：","0",26,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
        this._totalCount.setPositionX(this.width/2);
        this._totalCount.setPositionY(this.height/2);
      this._totalCount.setColor(cc.color(0,0,0));
        this.addChild(this._totalCount);

    },

})