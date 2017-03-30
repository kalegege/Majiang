/**
 * Created by foo on 2016/11/15.
 */


var UserLayer = cc.Layer.extend({
    _handCards: [],
    _deskCards: [],
    _solidCards:[],
    _handCardsLayer: null,
    _deskCardsLayer: null,
    _solidCardsLayer:null,
    _drawCard: null, // 抓牌
    _pongManage: null,
    _direction: null, //方向
    _cardtype: null,
    disableTouchEvent: true,
    _callback: null,
    ctor: function (direction) {
        this._super();
        this._direction = direction;

        switch (this._direction) {
            case DIRECTION.DOWN:
                this._cardtype = Card.TYPE.HAND_DOWN;
                break;
            case DIRECTION.UP:
                this._cardtype = Card.TYPE.HAND_UP;
                break;
            case DIRECTION.LEFT:
                this._cardtype = Card.TYPE.HAND_LEFT;
                break;
            case DIRECTION.RIGHT:
                this._cardtype = Card.TYPE.HAND_RIGHT;
                break;
        }

        this._handCardsLayer = new cc.Layer();
        this._deskCardsLayer = new cc.Layer();this._solidCardsLayer=new cc.Layer();
        this._handCards = new Array();
        this._deskCards = new Array();
        this._solidCards=new Array();
        // this._handCardsLayer
        this.addChild(this._handCardsLayer);
        this.addChild(this._deskCardsLayer);
        this.addChild(this._solidCardsLayer);
    },
    setCallback: function (callback) {
        this._callback = callback;
    },
    dealCard2: function (cards) {
        this._handCards = cards.sort();
    },
    //发牌
    dealCard: function (cards) {
        this._handCards = cards.sort(function (a, b) {
            return b - a;
        });
        var offset = this._cardtype.offset, scale = this._cardtype.scale || 1;
        for (var i = 0; i < this._handCards.length; i++) {   // = this._handCards.length - 1; i >= 0; i--) {
            var k = this._direction == DIRECTION.DOWN ? this._handCards[i] : "";
            var card = Card.create(k, this._cardtype.prefix);
            cc.log(card.width);
            switch (this._direction) {
                case DIRECTION.DOWN:
                    card.x = 200 + ( i * offset.width * scale + offset.width * scale / 2);
                    card.y = offset.height * scale / 2 + 50;
                    this._bindTouchEvent(card);
                    break;
                case DIRECTION.UP:
                    card.x = cc.winSize.width - (200 + ( i * offset.width * scale + offset.width * scale / 2));
                    card.y = cc.winSize.height - 100 - offset.height * scale / 2 + 50;
                    break;
                case DIRECTION.LEFT:
                    card.x = 100;
                    card.y = cc.winSize.height - (  180 + (i * offset.height * scale + offset.height * scale / 2));//      cc.winSize.height - 100 - (i * offset.height + offset.height / 2);
                    break;
                case DIRECTION.RIGHT:
                    card.x = cc.winSize.width - 100;
                    card.y = 180 + (i * offset.height * scale + offset.height * scale / 2);
                    break;
            }
            // card.setTag(k);
            card.setTag(i);
            card.id =   this._handCards[i];
            card.setVisible(false);
            card.setScale(scale);
            this._handCardsLayer.addChild(card);
        }


        (function (index) {
            if (this._handCardsLayer.children.length > index) {

                var target = this._handCardsLayer.children[index];
                if (target) {
                    var action = cc.sequence(cc.scaleTo(0.2, 1),
                        cc.callFunc(arguments.callee.bind(this, index + 1))
                    );
                    target.setScale(1.5);
                    target.setVisible(true);
                    target.runAction(action);
                } else {
                }
            } else {
                // this.scheduleUpdate();
                this._direction == DIRECTION.DOWN && this.sortHandCard();
            }
        }.bind(this))(0);
    },
    sortHandCard: function () {
        var childs = this._handCardsLayer.getChildren();
        childs = childs.sort(function (a, b) {
            return b.id - a.id;
        });
        this._direction == DIRECTION.DOWN && cc.log(this._handCards);

        this._handCards = this._handCards.sort(function (a, b) {
            return b - a;
        });
        this._direction == DIRECTION.DOWN && cc.log(this._handCards);

        var offset = this._cardtype.offset, scale = this._cardtype.scale || 1;
        for (var i = childs.length - 1; i >= 0; i--) {
            var card = childs[i];
            switch (this._direction) {
                case DIRECTION.DOWN:
                    card.x = 1000 - ( i * offset.width * scale + offset.width * scale / 2);
                    break;
                case DIRECTION.RIGHT:
                    card.y = 180 + (i * offset.height * scale + offset.height * scale / 2);
                    break;
                case DIRECTION.UP:
                    card.x = cc.winSize.width - (200 + ( i * offset.width * scale + offset.width * scale / 2));
                    break;
                case DIRECTION.LEFT:
                    card.y = cc.winSize.height - (180 + (i * offset.height * scale + offset.height * scale / 2));
                    break;
            }
            card.setTag(i);
        }
    },
    _bindTouchEvent: function (card) {
        EventManager.bindTouch({target: this, onTouchBegan: this.onTouchBegan}, card);
    },
    onEnter: function () {
        this._super();
        // this.dealCard();
        cc.log("UserLayer onEnter")
    },
    onTouchBegan: function (touch, event) {
        if (this.disableTouchEvent) return false;
        cc.log("onTouchBegan");
        var target = event.getCurrentTarget()
        this.playCard2(target);
        this.disableTouchEvent = true;
        Game.op.playCard(target.id);
        return true;
    },
    onExit: function () {
        this._super();
    },
    update: function (dt) {
        // for(var i=0;i<this._handCards.length;i++){
        //     this._handCardsLayer =
        // }

        cc.log("ttt:" + dt);
    },
    //抓牌
    drawCard: function (card) {

        this._playCard = Card.create(this._direction == DIRECTION.DOWN ? card : "", this._cardtype.prefix);

        // this._playCard = this._getCard(this._direction == DIRECTION.DOWN ? card : "");

        var offset = this._cardtype.offset, scale = this._cardtype.scale || 1;
        switch (this._direction) {
            case DIRECTION.DOWN:
                this._playCard.x = cc.winSize.width - 150;
                this._playCard.y = offset.height * scale / 2 + 50;
                this._bindTouchEvent(this._playCard);
                break;
            case DIRECTION.UP:
                this._playCard.x = 150;
                this._playCard.y = cc.winSize.height - 100 - offset.height * scale / 2 + 50;
                break;
            case DIRECTION.LEFT:
                this._playCard.x = 100;
                this._playCard.y = 100;
                break;
            case DIRECTION.RIGHT:
                this._playCard.x = cc.winSize.width - 100;
                this._playCard.y = cc.winSize.height - 100;
                break;
        }

        this._playCard.setTag(this._handCards.length);
        this._playCard.id = card;

        this._handCards.push(card);
        this._handCardsLayer.addChild(this._playCard);

        this.disableTouchEvent = false;

        cc.log("-----------抓牌后手牌-----------------");
        cc.log(this._handCards);
    },
    pengCard:function (player) {
        var card=player.cards[0].cards[0];
        var position=player.position;

        var solid;
        var x,y;

        switch(DIRECTION.positionToDirection(position||DIRECTION.DOWN)){
            case DIRECTION.UP:
                //上
                solid=Card.TYPE.DESK_UP_SMALL;
                break;
            case DIRECTION.DOWN:
                //下
                solid=Card.TYPE.DESK_DOWN_SMALL;
                break;
            case DIRECTION.LEFT:
                //左
                solid=Card.TYPE.DESK_LEFT_SMALL;
                break;
            case DIRECTION.RIGHT:
                //右
                solid=Card.TYPE.DESK_RIGHT_SMALL;
                break;
        }

        if((this._direction == DIRECTION.DOWN)){
            //去除手中的碰牌
            var _t_cards =[];
            for(var j = 0;j< 2;j++){
                var _target = this._handCardsLayer.getChildByTag(this._handCards.indexOf(card)+j);
                _target.removeFromParent();
                _t_cards.push(card);
            }
            this._handCards.remove(_t_cards);
        }else{
            //其他人删除
            for(var j=0;j<2;j++){
                var index=this._handCards.indexOf(0);
                var pengItems=this._handCardsLayer.getChildByTag(index+j);
                pengItems.removeFromParent();
                this._handCards.remove(0);
            }
        }


        for(var i=0;i<3;i++){
            var tmpCard = Card.create(card, solid.prefix);
            tmpCard.id=card;
            this._solidCards.add(card);
            this._solidCardsLayer.addChild(tmpCard);


            switch(DIRECTION.positionToDirection(position||DIRECTION.DOWN)){
                case DIRECTION.UP:
                    //上
                    x=1200-parseInt((this._solidCards.length-1)/3)*120 -parseInt((this._solidCards.length-1)%3)*33;
                    y=650;
                    break;
                case DIRECTION.DOWN:
                    //下
                    x=60+parseInt((this._solidCards.length-1)/3)*120 +parseInt((this._solidCards.length-1)%3)*33;
                    y=75;
                    break;
                case DIRECTION.LEFT:
                    //左
                    x=120;
                    y=650-parseInt((this._solidCards.length-1)/3)*120 -parseInt((this._solidCards.length-1)%3)*33;
                    break;
                case DIRECTION.RIGHT:
                    //右
                    x=1200;
                    y=75+parseInt((this._solidCards.length-1)/3)*120 +parseInt((this._solidCards.length-1)%3)*33;;
                    break;
            }

            var action = cc.spawn(cc.moveTo(0.1, cc.p(x, y)), cc.scaleTo(0.1, 1));

            tmpCard.runAction(cc.sequence(action, cc.callFunc(function () {
                // this._deskCardsLayer.removeChild(tmpTarget);
                cc.log(tmpCard.x + "," + tmpCard.y);

                // this.sortHandCard();
            }.bind(this))));
            // }
        }

        this.sortHandCard();
        this.disableTouchEvent=false;

        cc.log("-----------碰牌后手牌-----------------");
        cc.log(this._handCards);
    },

    chiCard:function (player) {
        var card=player.cards[0].cards;
        var position=player.position;
        cc.log(card);

        var solid;
        var x,y;

        switch(DIRECTION.positionToDirection(position||DIRECTION.DOWN)){
            case DIRECTION.UP:
                //上
                solid=Card.TYPE.DESK_UP_SMALL;
                break;
            case DIRECTION.DOWN:
                //下
                solid=Card.TYPE.DESK_DOWN_SMALL;
                break;
            case DIRECTION.LEFT:
                //左
                solid=Card.TYPE.DESK_LEFT_SMALL;
                break;
            case DIRECTION.RIGHT:
                //右
                solid=Card.TYPE.DESK_RIGHT_SMALL;
                break;
        }


        if((this._direction == DIRECTION.DOWN)){
            //去除手中的碰牌
            var _t_cards =[];
            for(var j = 0;j< card.length-1;j++){
                var _target = this._handCardsLayer.getChildByTag(this._handCards.indexOf(card[j]));
                _target.removeFromParent();
                _t_cards.push(card[j]);
            }
            this._handCards.remove(_t_cards);
        }else{
            //其他人删除
            for(var j=0;j<2;j++){
                var index=this._handCards.indexOf(0);
                var pengItems=this._handCardsLayer.getChildByTag(index+j);
                pengItems.removeFromParent();
                this._handCards.remove(0);
            }
        }

        var sortCard=card.sort();

        for(var i=0;i<3;i++){
            var tmpCard = Card.create(sortCard[i], solid.prefix);
            tmpCard.id=sortCard[i];
            this._solidCards.add(sortCard[i]);
            this._solidCardsLayer.addChild(tmpCard);

            switch(DIRECTION.positionToDirection(position||DIRECTION.DOWN)){
                case DIRECTION.UP:
                    //上
                    x=1200-parseInt((this._solidCards.length-1)/3)*120 -parseInt((this._solidCards.length-1)%3)*33;
                    y=650;
                    break;
                case DIRECTION.DOWN:
                    //下
                    x=60+parseInt((this._solidCards.length-1)/3)*120 +parseInt((this._solidCards.length-1)%3)*33;
                    y=75;
                    break;
                case DIRECTION.LEFT:
                    //左
                    x=120;
                    y=650-parseInt((this._solidCards.length-1)/3)*120 -parseInt((this._solidCards.length-1)%3)*33;
                    break;
                case DIRECTION.RIGHT:
                    //右
                    x=1200;
                    y=75+parseInt((this._solidCards.length-1)/3)*120 +parseInt((this._solidCards.length-1)%3)*33;;
                    break;
            }

            var action = cc.spawn(cc.moveTo(0.1, cc.p(x, y)), cc.scaleTo(0.1, 1));

            tmpCard.runAction(cc.sequence(action, cc.callFunc(function () {
                // this._deskCardsLayer.removeChild(tmpTarget);
                cc.log(tmpCard.x + "," + tmpCard.y);

                // this.sortHandCard();
            }.bind(this))));
            // }
        }

        this.sortHandCard();

        this.disableTouchEvent=false;

        cc.log("-----------吃牌后手牌-----------------");
        cc.log(this._handCards);

    },

    removeCard:function () {
        this._deskCardsLayer.getChildren()[this._deskCards.length-1].removeFromParent();
        this._deskCards.removeLastItem();
    },

    playCard: function (card) {
        if(this._direction == DIRECTION.DOWN) return;
        this.autoPlayCard(card);
    },
    autoPlayCard: function (card) {
        var ccs =[];

        if(this._direction == DIRECTION.DOWN){
            for(var k=0;k<this._handCardsLayer.children.length;k++) {
                ccs.push(this._handCardsLayer.getChildByTag(k).id);
            }
            cc.log("-----------_handCards-----------------");
            cc.log(this._handCards);
            cc.log("-----------_handCardsLayer------------");
            cc.log(ccs);
        }

        if(this._direction == DIRECTION.DOWN && this.disableTouchEvent) return false;

        var target  = this._handCardsLayer.getChildren()[this._handCardsLayer.getChildrenCount()-1]
        // var target = this._handCardsLayer.children[this._handCardsLayer.children];
        target.id = card;
        this.playCard2(target);
        this.disableTouchEvent = true;
    },
    playCard2: function (target) {

        var tmpTarget = Card.create(this._direction == DIRECTION.DOWN ? target.id : "", this._cardtype.prefix);
        tmpTarget.setPosition(target.getPosition());
        tmpTarget.id = target.id;


        target.removeFromParent();
        // cc.log( this._handCardsLayer.removeChildByTag(target.tag));
        this._handCards = this._direction == DIRECTION.DOWN ? this._handCards.remove(target.id) : this._handCards.remove(this._handCards[0]);
        // this._handCards =this._handCards.remove(this._handCards[0]);

        var ctd;
        switch (this._direction) {
            case DIRECTION.DOWN:
                ctd = Card.TYPE.DESK_DOWN_SMALL;
                break;
            case DIRECTION.LEFT:
                ctd = Card.TYPE.DESK_LEFT_SMALL;
                break;
            case DIRECTION.UP:
                ctd = Card.TYPE.DESK_UP_SMALL;
                break;
            case DIRECTION.RIGHT:
                ctd = Card.TYPE.DESK_RIGHT_SMALL;
                break;
        }


        cc.log(DIRECTION[this._direction]);
        cc.log(this._deskCards);


        var deskTarget = Card.create(tmpTarget.id, ctd.prefix);
        // var deskTarget = Card.create(this._handCards[0], ctd.prefix);




        deskTarget.retain();
        var offset = ctd.offset;
        var x, y;
        switch (this._direction) {
            case DIRECTION.DOWN:
                x = 475 + parseInt(this._deskCards.length % 10) * offset.width;
                y = 270 - parseInt(this._deskCards.length / 10) * offset.height;
                break;
            case DIRECTION.LEFT:
                x = 435 - parseInt(this._deskCards.length / 10) * offset.width;
                y = cc.winSize.height - ( 220 + parseInt(this._deskCards.length % 10) * offset.height);
                deskTarget.setLocalZOrder(this._deskCards.length);
                break;
            case DIRECTION.UP:
                x = cc.winSize.width - (475 + parseInt(this._deskCards.length % 10) * offset.width);
                y = cc.winSize.height - (270 - parseInt(this._deskCards.length / 10) * offset.height);
                break;
            case DIRECTION.RIGHT:
                x = cc.winSize.width - (435 - parseInt(this._deskCards.length / 10) * offset.width);
                y = 220 + parseInt(this._deskCards.length % 10) * offset.height;
                deskTarget.setLocalZOrder(-this._deskCards.length);
                break;
        }

        this._deskCards = this._deskCards.add(tmpTarget.id);
        this._deskCardsLayer.addChild(tmpTarget);

        // cc.log("x,y--" + x + "," + y);
        // if (this._direction == DIRECTION.DOWN) {
        // cc.log(tmpTarget);
        // cc.log(deskTarget);
        var action = cc.spawn(cc.moveTo(0.1, cc.p(x, y)), cc.scaleTo(0.1, 0.5));

        tmpTarget.runAction(cc.sequence(action, cc.callFunc(function () {
            // this._deskCardsLayer.removeChild(tmpTarget);
            // cc.log(tmpTarget.x + "," + tmpTarget.y);
            var x = tmpTarget.x, y = tmpTarget.y;
            tmpTarget.removeFromParent();
            // cc.log(this._deskCardsLayer);
            // cc.log(deskTarget);
            this._deskCardsLayer.addChild(deskTarget);
            deskTarget.setPosition(x, y);
            deskTarget.release();

            this.sortHandCard();
        }.bind(this))));
        // }

        // cc.log(this._deskCards);

        // cc.log("----------------------------打出后手牌");
        // for(var k=0;k<this._handCardsLayer.children.length;k++) {
        //     cc.log("第"+k+"个:");
        //     cc.log(this._handCardsLayer.children[k].id);
        // }
        // cc.log(this._handCards);
        cc.log("-----------自动出牌后手牌-----------------");
        cc.log(this._handCards);

        // this._callback && this._callback(this._direction);
    },
    _getCardType: function () {
        var ct = null;
        switch (this._direction) {
            case DIRECTION.DOWN:
                ct = Card.TYPE.HAND_DOWN;
                break;
            case DIRECTION.RIGHT:
                ct = Card.TYPE.HAND_RIGHT;
                break;
            case DIRECTION.UP:
                ct = Card.TYPE.HAND_UP;
                break;
            case DIRECTION.LEFT:
                ct = Card.TYPE.HAND_LEFT;
                break;
        }
        return ct;
    },

    //碰
    pong: function (cards) {
        this._pongManage = this._pongManage || new CardMananger(this);
        this._pongManage.setPosition({x: 100, y: 100});
        this._pongManage.init([2, 3, 4]);
    },
    //杠
    kong: function (cards) {

    },
    //吃
    chow: function (cards) {

    },
    cUpdate: function () {

        //
        // var childrens = this._handCardsLayer.getChildren();
        //
        // for(var i = 0 ;i< childrens .length;i++){
        //
        // }
        //
        // var x = cc.winSize.width - 200 - ( i * card.width + card.width / 2);
        //
        // for (var i = this._handCards.length - 1; i >= 0; i--) {
        //     var card = Card.create(this._handCards[i], Card.TYPE.SELF);
        //     this._bindTouchEvent(card);
        //     card.x = cc.winSize.width - 200 - ( i * card.width + card.width / 2);
        //     card.y = card.height / 2 + 50;
        //     card.setTag(i);
        //     card.setVisible(false);
        //     this._handCardsLayer.addChild(card);
        // }
    }
});