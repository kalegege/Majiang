/**
 * Created by kale on 2016/11/15.
 */

var GameBackgroundLayer = cc.Layer.extend({

    _bg1:null,
    _table:null,
    _point:null,
    _numLabel:null,
    speed:5,
    timeFlag:9,
    times:0,
    numFlag:0,
    innerFlag:0,

    ctor:function () {
        this._super();
        this.times=0;
        // this.numFlag=10;

        var winSize = cc.director.getWinSize();
        this._bg1 = new cc.Sprite(res.back_1_jpg);
        this._bg1.x = winSize.width / 2;
        this._bg1.y = winSize.height / 2;
        this.addChild(this._bg1);

        //加载桌子
        this.loadTable();

        //加载点
        this.loadPoint();

        //加载倒计时
        this._numLabel=new cc.LabelTTF(10,"Arial",32,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._numLabel.setPositionX(this.width/2);
        this._numLabel.setPositionY(this.height/2);
        this.addChild(this._numLabel);
        this._numLabel.setVisible(false);

        return true;
    },
    loadTable:function () {
        var action=null;
        this._table = new cc.Sprite(res.b_1_jpg);
        this._table.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        switch (Game.userPosition||DIRECTION.DOWN){
            case DIRECTION.UP:
                //上
                action=cc.rotateTo(0.5,180);
                break;
            case DIRECTION.DOWN:
                //下
                action=cc.delayTime(0.5);
                break;
            case DIRECTION.LEFT:
                //左
                action=cc.rotateTo(0.5,90);
                break;
            case DIRECTION.RIGHT:
                //右
                action=cc.rotateTo(0.5,-90);
                break;

        }
        this.addChild(this._table);
        this._table.runAction(action);
    },

    loadCount:function (num) {
        this.numFlag=num;
        this._numLabel.setString(num);
        this._numLabel.setVisible(true);
    },
    stopCount:function () {
      this._numLabel.setVisible(false);
    },
    loadPoint:function () {
        this._point=new cc.Sprite(res.point_png);
        this._point.setPosition(640,260);
        this.addChild(this._point);
        this.scheduleUpdate();
    },
    closePoint:function () {
        this.removeChild(this._point);

    },
    changeStatus:function(position){
        switch(DIRECTION.positionToDirection(position||DIRECTION.DOWN)){
            case DIRECTION.UP:
                //上
                this._point.setPosition(640,480);
                break;
            case DIRECTION.DOWN:
                //下
                this._point.setPosition(640,260);
                break;
            case DIRECTION.LEFT:
                //左
                this._point.setPosition(520,365);
                break;
            case DIRECTION.RIGHT:
                //右
                this._point.setPosition(760,365);
                break;
            default:
                this.numFlag=10;
                this._numLabel.setString(10);
                this._numLabel.setVisible(true);
                break;
        }

    },
    closeCount:function () {
        this.removeChild(this.count);
    },
    update:function (dt) {
        this.times++;
        if(this.times > 30){
            this.times=0;
        }
        this._point.setOpacity(255-8*this.times);

        if(this.numFlag > 0){
            this._numLabel.setVisible(true);
            if(this.innerFlag++ >60){
                this._numLabel.setString(this.numFlag--);
                this.innerFlag=0;
            }
        }else{
            if(this.innerFlag++ >60) {
                var self=this.getParent();
                this._numLabel.setVisible(false);
                self._userAction.resetBackGround();
            }
        }
    },


});

