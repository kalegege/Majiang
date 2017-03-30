/**
 * Created by foo on 2016/11/15.
 */

var Card = cc.Sprite.extend({
    id: 0,
    type: null,
    ctor: function (id, type) {
        this._super("#" + type + id + ".png");
        this.id = id;
        this.type = type;
        return true;
    },
    /**
     * call by cc.pool.getFromPool
     * @param type int
     */
    reuse: function (id, type) {
        this.setSpriteFrame(type + id + ".png");
        this.id = id;
        this.type = type;
    },
    unuse: function () {
        this.retain();          //jsb必须加这句
    }
});

Card.create = function (id, type) {
    if (cc.pool.hasObject(Card)) {
        return cc.pool.getFromPool(Card, id, type);
    }
    else {
        return new Card(id, type);
    }
};


Card.TYPE = {
    DESK_RIGHT_SMALL: {prefix: "yx_", offset: {width: 40, height: 28}},//40,37
    DESK_LEFT_SMALL: {prefix: "zx_", offset: {width: 40, height: 28}}, //40,37
    DESK_DOWN_SMALL: {prefix: "szx_", offset: {width: 33, height: 47}}, //33,47
    DESK_UP_SMALL: {prefix: "sfx_", offset: {width: 33, height: 47}},  //33,47

    HAND_DOWN: {prefix: "x_", offset: {width: 66, height: 94}},   //66,94
    HAND_UP: {prefix: "bx", offset: {width: 66, height: 94}},   //66,94
    HAND_RIGHT: {prefix: "by", offset: {width: 16, height: 21}, scale: 1.5},
    HAND_LEFT: {prefix: "bz", offset: {width: 16, height: 21}, scale: 1.5},

    SELF_WIN: {prefix: "sz_"},         //66,94
    DESK_BACK_RIGHT: {prefix: ""},
    DESK_BACK_UP: {prefix: "bx"},
    DESK_BACK_DOWN: {prefix: ""}
};

Card.POSITION = {
    DESK: 0,
    HAND: 1,
    BACK: 2
};


// Card.get = function (card) {
//     var ct = null;
//     switch (this._direction) {
//         case DIRECTION.DOWN:
//             ct = Card.TYPE.HAND_DOWN;
//             break;
//         case DIRECTION.RIGHT:
//             ct = Card.TYPE.HAND_RIGHT;
//             break;
//         case DIRECTION.UP:
//             ct = Card.TYPE.HAND_UP;
//             break;
//         case DIRECTION.LEFT:
//             ct = Card.TYPE.HAND_LEFT;
//             break;
//     }
//     return new Card(card, ct);
// }
//

// Card.offset= function () {
//
//
// };

