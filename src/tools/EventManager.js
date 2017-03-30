/**
 * Created by foo on 2016/11/16.
 */


var EventManager = cc.Class.extend({
    _touchBegin: null,
    isClicked: false,
    _onDoubleTouch: null,
    ctor: function (argObj, node) {

        var self = this;

        argObj = argObj || {};

        this._onDoubleTouch = argObj.onDoubleTouch;

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            target: argObj.target,
            onTouchBegan: function (touch, event) {
                if (argObj.onTouchBegan) {
                    if (self._has(touch, event)) {
                        // if (self.isClicked) {
                        //     self.isClicked = false;
                        //     self.onDoubleTouch.call(self, touch, event);
                        // } else {
                        //     var _this = this;
                        //     cc.scheduleOnce(function () {
                        //         self._onTouchBegan.call(_this, touch, event);
                        return argObj.onTouchBegan.call(argObj.target || this, touch, event);
                        //     }, 0.3);
                        //     self.isClicked = true;
                        // }
                    }
                    return false;
                }
                return true;
            },
            onTouchMoved: argObj.onTouchMoved,
            onTouchEnded: argObj.onTouchEnded,
            onDoubleTouch: function (touch, event) {

            }
        });
        cc.eventManager.addListener(listener, node);
    },
    onDoubleTouch: function (touch, event) {
        cc.log("onDoubleTouch...");
        this._onDoubleTouch.call(this, touch, event);
    },
    _has: function (touch, event) {
        var target = event.getCurrentTarget();
        var posInNode = target.convertToNodeSpace(touch.getLocation());
        var size = target.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);
        return cc.rectContainsPoint(rect, posInNode);
    }
});


EventManager.bindTouch = function (argObj, node) {
    return new EventManager(argObj, node);
}
