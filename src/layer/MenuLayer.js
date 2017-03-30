/**
 * Created by kale on 2016/11/17.
 */

var MenuLayer2=ccui.Layout.extend({
    _backGround:null,
    _slider:null,
    _text:null,
    _close:null,

    ctor:function () {
        this._super();
        //加载背景
        this.loadBackground();
        //加载滑块
        this.loadSlider();
        this._slider.setPosition(cc.p(0,0));
        //加载文字说明
        this.loadText("音量：",50);
        this._text.setPosition(cc.p(-200,0));
        //加载关闭符号
        this.loadButton(res.button_close_png,this.onButtonTouchEvent);
        this._close.setPosition(cc.p(300,200));
    },
    onEnter:function () {
        this._super();
        // Sound.playBackgroundMusic();
        //cc.director.pause();
    },
    onExit:function () {
        //cc.director.resume();
        this._super();
    },
    loadBackground:function () {
        this._backGroud=new ccui.ImageView(res.bg_setup_png);
        this.addChild(this._backGroud);
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
                Sound.stop();
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
    loadText:function (message,size) {
        var self=this;
        cc.log("start load text");
        self._text=new cc.LabelTTF(message,"Arial",size,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        self._text.setPositionX(600);
        self._text.setPositionY(640);
        self.addChild(self._text);
    },
    loadSlider:function () {
        var self=this;
        cc.log("start load sider");
        self._slider=new ccui.Slider();
        this.addChild(self._slider);
        //加载背景纹理图
        self._slider.loadBarTexture(res.slider_bar_png);
        self._slider.loadSlidBallTextures(
            res.slider_ball_normal_png,
            res.slider_ball_normal_png,
            ""
        );
        self._slider.loadProgressBarTexture(res.slider_process_png);
        var UIpositon=this.convertToNodeSpace(cc.p(0,0));
        self._slider.setPosition(cc.p(820,640));
        self._slider.setScale(2);
        self._slider.addEventListener(this.onSliderEvent,this);
    },
    onSliderEvent:function (sender,type) {
        switch(type){
            case ccui.Slider.EVENT_PERCENT_CHANGED:
                var percent=sender.getPercent();
                cc.log("百分比："+percent.toFixed(0));
                Sound.setMusic(percent.toFixed(0)/100);
                break;
            default:
                break;
        }
    },
    removeSilder:function () {
        this.removeChild(this._slider);
    }

});

