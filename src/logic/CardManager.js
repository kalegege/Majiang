/**
 * Created by foo on 2016/11/17.
 */


var CardMananger = cc.Class.extend({
    _layer: null,
    _cards: [],
    _cardsLayer: null,
    ctor: function (layer) {
        this._layer = layer;
        this._cardsLayer = new cc.Layer();
        this._layer.addChild(this._cardsLayer);
    },
    init: function (cards) {
        this._cards.add(cards);
        for (var i = 0; i < this._cards.length; i++) {
            var card = Card.create(this._cards[i], Card.TYPE.DESK_DOWN_SMALL);
            this._cardsLayer.addChild(card);
            card.x = i * card.width;
        }
    },
    setPosition:function (args) {
        this._cardsLayer.attr(args);
    },
    bindTouchEvent: function () {

    }
});

