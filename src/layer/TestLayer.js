/**
 * Created by kale on 2016/12/9.
 */
var TestLayer=ccui.Layout.extend({
  ctor:function () {
      this._super();

      var btn = new cc.Sprite(res.bg_input_up_png);
      btn.setPosition(cc.p(-200,0));
      this.addChild(btn);

      var btn1 = new cc.Sprite(res.bg_input_down_png);
      btn1.setPosition(cc.p(200,0));
      this.addChild(btn1);

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

              console.log("began action" + target.y);
              target.setScale(0.8);
              return true;
          }.bind(this),
          onTouchMoved: function (touch, event) {
              var target = event.getCurrentTarget();
          },
          onTouchEnded: function (touch, event) {
              var target = event.getCurrentTarget();

              //链接服务器
              if(cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS){
                  var ret=jsb.reflection.callStaticMethod("RCUtil","connect");
              }


              target.setScale(1);
              console.log("touch Ended");
          }.bind(this)
      });

      var _btnListener1 = cc.EventListener.create({
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

              //发送消息
              if(cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS){
                  var ret=jsb.reflection.callStaticMethod("RCUtil","sendMsg");
              }


              target.setScale(1);
              console.log("touch Ended");
          }.bind(this)
      });



      //加载设置按钮事件
      cc.eventManager.addListener(_btnListener, btn);
      cc.eventManager.addListener(_btnListener1, btn1);
  }
})
