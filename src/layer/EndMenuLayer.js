/**
 * Created by kale on 2016/12/1.
 */

var EndMenuLayer =ccui.Layout.extend({
    _backGroud:null,
    _text1:null,
    _text2:null,
    _text3:null,
    _text4:null,
    ctor:function () {
        this._super();

        this.loadIMageView();
        this.loadText();
        this.setText(3,"李咏          900       失败     傅旭栋");
    },
    onEnter:function () {
        this._super();
    },
    onExit:function () {

    },
    loadIMageView:function () {
        this._backGroud=new ccui.ImageView(res.bg_setup_png);
        this.addChild(this._backGroud);
        //node.setPosition(cc.winSize.width/2,cc.winSize.height/2);
    },
    closeImageView:function () {
        this.removeFromParent();
    },
    loadText:function () {
        this._text1=new ccui.Text("李涛      1000      失败    傅旭栋","AmericanTypewriter",10);
        this._text1.setPositionY(0);
        this._text2=new ccui.Text("王勇超      1000      失败    傅旭栋","AmericanTypewriter",10);
        this._text2.setPositionY(-20);
        this._text3=new ccui.Text("李周峰      1000      成功    傅旭栋","AmericanTypewriter",10);
        this._text3.setPositionY(-40);
        this._text4=new ccui.Text("傅旭栋      1000      失败    傅旭栋","AmericanTypewriter",10);
        this._text4.setPositionY(-60);
        this.addChild(this._text1);
        this.addChild(this._text2);
        this.addChild(this._text3);
        this.addChild(this._text4);
    },
    setText:function (i,message) {
        switch (i){
            case 1:
                this._text1.setString(message);
                break;
            case 2:
                this._text2.setString(message);
                break;
            case 3:
                this._text3.setString(message);
                break;
            case 4:
                this._text4.setString(message);
                break;
        }
    }
});