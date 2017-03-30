/**
 * Created by foo on 2016/11/17.
 */

var p = Array.prototype;

p.remove = function (item) {
    var _items = item instanceof Array ? item : [item];
    for (var i = 0; i < _items.length; i++) {
        var index = this.indexOf(_items[i]);
        if (index > -1) {
            this.splice(index, 1);
        }
    }
    return this;
};

p.removeLastItem= function () {
    this.splice(this.length-1, 1);
    return this;
};

p.add = function (item) {
    var _items = item instanceof Array ? item : [item];
    for (var i = 0; i < _items.length; i++) {
        this.push(_items[i]);
    }
    return this;
};
