/**
 * Created by foo on 2016/11/18.
 */



var CARDTYPE = {
    DESK_RIGHT_SMALL: {prefix: "yx_", offset: {width: 40, height: 37}},//40,37
    DESK_LEFT_SMALL: {prefix: "zx_", offset: {width: 40, height: 37}}, //40,37
    DESK_DOWN_SMALL: {prefix: "szx_", offset: {width: 33, height: 47}}, //33,47
    DESK_UP_SMALL: {prefix: "sfx_", offset: {width: 33, height: 47}},  //33,47

    HAND_DOWN: {prefix: "x_", offset: {width: 66, height: 94}},   //66,94
    HAND_UP: {prefix: "bx", offset: {width: 66, height: 94}},   //66,94
    HAND_RIGHT: {prefix: "by", offset: {width: 16, height: 21}},
    HAND_LEFT: {prefix: "bz", offset: {width: 16, height: 21}},

    SELF_WIN: {prefix: "sz_"},         //66,94
    DESK_BACK_RIGHT: {prefix: ""},
    DESK_BACK_UP: {prefix: "bx"},
    DESK_BACK_DOWN: {prefix: ""}
};

var DIRECTION = {
    DOWN: 0,
    RIGHT: 1,
    UP: 2,
    LEFT: 3
};




(function () {
    for (var i in DIRECTION) {
        DIRECTION[DIRECTION[i]] = i;
    }
})();


DIRECTION.positionToDirection = function (p) {
    return ((4 - p) + Game.userPosition) % 4;
};


DIRECTION.getCardType = function (direction) {


};


// var Card = {
//     DESK_RIGHT_SMALL: "yx_", //40,37
//     DESK_LEFT_SMALL: "zx_", //40,37
//     DESK_DOWN_SMALL: "szx_", //33,47
//     DESK_UP_SMALL: "sfx_",   //33,47
//
//     HAND_DOWN: "x_",        //66,94
//     HAND_UP: "bx",        //66,94
//     HAND_RIGHT: "by",
//     HAND_LEFT: "bz",
//
//     SELF_WIN: "sz_",         //66,94
//     DESK_BACK_RIGHT: "",
//     DESK_BACK_UP: "bx",
//     DESK_BACK_DOWN: ""
// };
//
