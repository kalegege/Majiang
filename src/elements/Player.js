/**
 * Created by kale on 2016/11/15.
 */

var Player =cc.Layer.extend({
    _handPoke:null,
    _deskPoke:null,
    _specPoke:null,
    _sprite:null,
    _status:0,
    ctor:function () {
        this._super();
        this._status=0;
        this._specPoke=[];
        var self=this;

        var winSize = cc.director.getWinSize();
        for(var i=1;i<13;i++) {
            //var poke = new cc.Sprite(res.redmiddle_png);
            var poke = new cc.MenuItemImage(res.redmiddle_png, res.redmiddle_png,this._onclick);
            //var sprite = new cc.Sprite(res.redmiddle_png);
            var sprite =new cc.Sprite(res.redmiddle_png);
            //sprite.setSpriteFrame(res.redmiddle_png)
            //sprite.x=-400 + i*60;
            // sprite.y=-200;
            poke.x = 100 + i * 60;
            poke.y = -100;
            this._specPoke.push(sprite);
            //this.addChild(sprite);
        }

        //var menu=new cc.Menu(this._specPoke);
        // menu.alignItemsInColumns(2);
        //menu.alignItemsHorizontallyWithPadding(0);
        //this.addChild(this._specPoke[0]);

        this._sprite =new cc.Sprite(res.redmiddle_png);
        this._sprite.x=100;
        this._sprite.y=100;
        this.addChild(this._sprite);

        var LocalListener=cc.EventListener.create({
            //let self=this;
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,

            onTouchBegan:function(touch,event){
                console.log("touch start!");
                var target=event.getCurrentTarget();
                var posInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0,0,size.width,size.width);

                if(!(cc.rectContainsPoint(rect, posInNode))){
                    return false;
                }

                console.log("touch start!"+target.y);
                if(self._status == 1){
                    //dd.y -=100;
                    self._status =0;
                    var sprite1=cc.moveTo(1,cc.p(500,420));
                    target.runAction(sprite1);
                }else if(self._status == 0){
                    target.y +=100;
                    target.setRotationX(60);
                    self._status =1;
                }
                //dd.y+=100;
                console.log("touch start!"+target.y);

                return true;
            },
            onTouchEnded:function(touch,event){
                console.log("touch Ended");
            }
        });
        //LocalListener.setEnabled(true);
        //this._sprite.touchEnabled=true;
        //console.log();
        //this._sprite.addEventListener(LocalListener,this);
        cc.eventManager.addListener(LocalListener,this._sprite);



        //this.init();
    },

    init:function () {
        var winSize = cc.director.getWinSize();

        this._deskPoke = new cc.MenuItemImage(res.desk_jpg, res.desk_jpg,this._onclick);
        var menu=new cc.Menu(this._deskPoke);
        //menu.alignItemsInColumns(2);
        menu.x=winSize.width / 2 +100;
        this.addChild(menu);
        return true;
    },

    _onclick:function () {
        // console.log("click");
        //if(_status == 0){
            console.log("small");
        this.y=100;
    },

    onEnter:function(){
        //cc.registerTargetedDelegate(0,true,this);
        //this._touchEnableed=true;
        this._super();
        console.log("onEnter");
    }

});