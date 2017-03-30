/**
 * Created by kale on 2016/12/1.
 */

var InfoLayer = cc.Layer.extend({
    _roomNum:null,
    _defaultMessage:null,
    _otherMessage:null,
    _default_direction:null,

    ctor:function () {
        this._super();
        var roomId=12345;
        // this.loadLabel(roomId);
        // this.loadText(6,199);
        // this._roomNum.setPosition(cc.p(100,690));
        // this._pokeNum.setPosition(cc.p(100,640));
    },
    setDirection:function(direction){
        this._default_direction=direction;
    },
    loadText:function (roomId,pokeId) {
        // var self=this;
        this._roomNum=new cc.LabelTTF("房间号："+roomId+"用户ID:"+Game.user.id,"Arial",32,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._roomNum.setPositionX(this.width/2);
        // this._roomNum.setPositionY(this.height/2);
        //this._roomNum.setAnchorPoint(0,0);
        this.addChild(this._roomNum);

        this._pokeNum=new cc.LabelTTF("剩余："+pokeId,"Arial",32,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // this._pokeNum.setPositionX(this.width/2);
        // this._pokeNum.setPositionY(this.height/2);
        //this._roomNum.setAnchorPoint(0,0);
        this.addChild(this._pokeNum);

        this._roomNum.setPosition(cc.p(100,690));
        this._pokeNum.setPosition(cc.p(100,640));
    },
    setLabelText:function (text) {
        this._roomNum.setString("房间号："+text);
    },
    setPokeText:function (text) {
        this._pokeNum.setString("剩余："+text);
    },
    loadMessage:function (message) {
        //创建按钮
        this._default_message =new ccui.Button();
        this._default_message.setName("TextButton");
        this._default_message.setTouchEnabled(false);
        this._default_message.loadTextures(res.bubble_1_png,res.bubble_1_png,"");
        this._default_message.setTitleText(message);
        this.addChild(this._default_message);
        // this._default_message.setE
        var gPosition=this.convertToNodeSpace(cc.p(200,200));
        this._default_message.setPosition(gPosition);
        this.scheduleOnce(this.close,5);
        cc.log(message+"loadMessage");
    },
    close:function () {
        var self=this.getParent();
        cc.log("5秒以后执行");
        this.removeChild(this._default_message);
        self._infoLayer.setLabelText("54321");
    },
    loadOtherMessage:function (message, position) {
        var gPosition=null;
        //创建按钮
        this._otherMessage =new ccui.Button();
        this._otherMessage.setName("TextButton");
        this._otherMessage.setTouchEnabled(false);
        this._otherMessage.loadTextures(res.bubble_1_png,res.bubble_1_png,"");
        this._otherMessage.setTitleText(message);
        this.addChild(this._otherMessage);
        // this._default_message.setE
        //根据位置不同设置不同显示位置
            switch(DIRECTION.positionToDirection(position||DIRECTION.RIGHT)){
            case DIRECTION.UP:
                //上
                gPosition=this.convertToNodeSpace(cc.p(1000,200));
                break;
            case DIRECTION.LEFT:
                //左
                gPosition=this.convertToNodeSpace(cc.p(200,600));
                break;
            case DIRECTION.RIGHT:
                //右
                gPosition=this.convertToNodeSpace(cc.p(1000,600));
                break;
            }
        // var gPosition=this.convertToNodeSpace(cc.p(200,200));
        this._otherMessage.setPosition(gPosition);
        this.scheduleOnce(this.closeOther,5);
        cc.log(message+"loadMessage");
    },
    closeOther:function () {
        cc.log("5秒以后执行");
        this.removeChild(this._otherMessage);
        // self._infoLayer.setLabelText("54321");
    },
    loadPlayImages:function (list) {
        for(var i=0;i<list.length;i++){
            var position=list[i];
            //加载图片按钮
            var Image = new cc.Sprite(res.fate_019_png);
            this.addChild(Image);

            var Text=new cc.LabelTTF("姓名："+list[i],"Arial",32);
            this.addChild(Text);

            //根据位置不同设置不同显示位置

            switch(position){
                case DIRECTION.UP:
                    //上
                    var gPosition=this.convertToNodeSpace(cc.p(1100,650));
                    var gPosition1=this.convertToNodeSpace(cc.p(1110,580));
                    break;
                case DIRECTION.DOWN:
                    //下
                    var gPosition=this.convertToNodeSpace(cc.p(100,200));
                    var gPosition1=this.convertToNodeSpace(cc.p(110,130));
                    break;
                case DIRECTION.LEFT:
                    //左
                    var gPosition=this.convertToNodeSpace(cc.p(50,360));
                    var gPosition1=this.convertToNodeSpace(cc.p(60,290));
                    break;
                case DIRECTION.RIGHT:
                    //右
                    var gPosition=this.convertToNodeSpace(cc.p(1200,360));
                    var gPosition1=this.convertToNodeSpace(cc.p(1210,290));
                    break;
            }
            Image.setPosition(gPosition);
            Text.setPosition(gPosition1);
        }
    }
});