/**
 * Created by kale on 2016/12/1.
 */
var TableLayer = cc.Layer.extend({
    _table:null,
    _point:null,
    _status:0,
    ctor:function () {
        this._super();

        this.loadTable();
        this.loadPoint();
    },
    onEnter:function () {
        this._super();
    },
    loadTable:function () {
        this._table=new cc.Sprite(res.desk_jpg);
        this._table.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        this.addChild(this._table);
    },
    changeStatus:function(i){
        var self=this;
        self._status=i;
        switch(this._status){
            case 1:
                //上
                self._point.setPosition(640,480);
                break;
            case 2:
                //下
                self._point.setPosition(640,260);
                break;
            case 3:
                //左
                self._point.setPosition(520,365);
                break;
            case 4:
                //右
                self._point.setPosition(760,365);
                break;
        }

    },
    loadPoint:function () {
        this._point=new cc.Sprite(res.point_png);
        this._point.setPosition(640,260);
        this.addChild(this._point);
        var actionBlink=cc.blink(100,200);
        this._point.runAction(actionBlink);
    }
});