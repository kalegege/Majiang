/**
 * Created by kale on 2016/12/1.
 */

var ChatLayer=ccui.Layout.extend({
    _listView:null,
    _backGroud:null,
    _label1:null,
    _label2:null,
    _pageView:null,
    _textFiled:null,
    _sendBtn:null,
    _voiceBtn:null,
    _onExit:null,

    ctor:function () {
        this._super();


        //加载聊天界面背景
        this.loadBackground();

        //加载聊天界面标签
        //this.loadLabels();

        //初始化聊天显示界面
        this.loadListView();
        this._listView.setPosition(cc.p(-300,-230));

        //插入输入框
        this.loadTextField();
        this._textFiled.setPosition(cc.p(-100,160));

        //加载发送按钮
        this._sendBtn = new cc.Sprite(res.send_normal_png);
        this._sendBtn.setPosition(cc.p(230,170));
        this.addChild(this._sendBtn);

        var _sendListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var posInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0, 0, size.width, size.width);
                if (!(cc.rectContainsPoint(rect, posInNode))) {
                    // this.removeFromParent();
                    return false;
                }

                console.log("began action" + target.y);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();


            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });

        var _voiceListener = cc.EventListener.create({
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

                //开始录音
                if(cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID){
                    var ret=jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","RstartVocie","()Ljava/lang/String;");
                }

                console.log("began action" + target.y);
                target.setScale(0.8);
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();

            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();

                //结束录音
                if(cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID){
                    var ret=jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","RendVoice","()Ljava/lang/String;");
                }

                target.setScale(1);
                console.log("touch Ended");
            }.bind(this)
        });


        //加载发送按钮事件
        cc.eventManager.addListener(_sendListener, this._sendBtn);

        //加载语音按钮事件
        // cc.eventManager.addListener(_voiceListener, this._voiceBtn);

        //this.loadPageView();
    },
    setExit:function (exit) {
        this._onExit = exit;
    },
    onEnter:function () {
        this._super();
    },
    loadBackground:function () {
        this._backGroud=new ccui.ImageView(res.bg_chat_png);
        this.addChild(this._backGroud);
    },
    loadLabels:function () {

        this._label1=new cc.LabelTTF("表情","Arial",32,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._label1);

        this._label2=new cc.LabelTTF("聊天","Arial",32,cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._label2);

    },
    loadTextField:function () {
        this._textFiled=new ccui.TextField("请输入语句:","Arial",30);
        this.addChild(this._textFiled);
        // var gPosition=this.convertToNodeSpace(cc.p(cc.winSize.width/2,cc.winSize.height/2));
        // this._textFiled.setPosition(gPosition);
        this._textFiled.addEventListener(this.onTextFieldEvent,this);
    },
    onTextFieldEvent:function (textField,type) {
        switch (type){
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                cc.log("挂载到输入法编辑器");
                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                cc.log("输入法编辑器--失去挂载");
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                cc.log("输入法编辑器--输入");
                break;
            case ccui.TextField.EVENT_DELETE_BACKWARD:
                cc.log("输入法编辑器--删除");
                break;
        }
    },
    loadListView:function () {
        this._listView=new ccui.ListView();
        this.addChild(this._listView);
        this._listView.setTouchEnabled(true);
        this._listView.setContentSize(cc.size(600,360));
        this._listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        //this._listView.setBackGroundColor(cc.color(128,128,128));
        // this._listView.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this._listView.addEventListener(this.clickButton.bind(this),this);

        //创建按钮
        var default_button =new ccui.Button();
        default_button.setName("TextButton");
        default_button.setTouchEnabled(true);
        default_button.loadTextures(res.chat_item2_png,res.chat_item2_png,"");


        //创建默认模型
        var default_item=new ccui.Layout();
        default_item.addChild(default_button);
        default_item.setLayoutType(ccui.LINEAR_GRAVITY_CENTER_VERTICAL);
        default_item.setBackGroundImageScale9Enabled(true);
        // default_item.setBackGroundImage(res.chat_item2_png);
        // default_item.addChild(label1);
        default_item.setTouchEnabled(true);
        default_item.setContentSize(default_button.getContentSize());
        // label1.x=default_item.width/2;
        // label1.y=default_item.height/2;
        default_button.x=default_item.width/2;
        default_button.y=default_item.height/2;
        default_button.setScaleX(1);
        default_button.setZoomScale(0.8);

        //设置模型
        this._listView.setItemModel(default_item);

        //添加4个项
        for(var i=0;i<6;i++){
            this._listView.pushBackDefaultItem();
        }

        //给前4个项设置文本标签
        for(var i=0;i<6;i++){
            var item=this._listView.getItem(i);
            var button=item.getChildByName("TextButton");
            var index=this._listView.getIndex(item);
            button.setTitleText("华数传媒第一届自行车比赛第"+i+"名");
            // button.setTitleColor(cc.color(255,0,0));
            button.setTitleFontSize(25);
        }

    },
    clickButton:function (sender,type) {
        var self=sender.getParent();
        switch(type){
            case ccui.ListView.EVENT_SELECTED_ITEM:

                // self.closeLayout();
                self.setVisible(false);
                var item=self._listView.getItem(sender.getCurSelectedIndex());
                var button=item.getChildByName("TextButton");
                // this._onExit && this._onExit(button.getTitleText());
                self.getParent().loadMessage(sender.getCurSelectedIndex());
                //self.loadMessage(sender.getCurSelectedIndex());
                cc.log("当前索引项："+sender.getCurSelectedIndex());
                break;
            default:
                break;
        }
    },
    closeLayout:function () {
        this.removeFromParent();
    },
    loadMessage:function (message) {
        var kk=this.getParent();
        kk.loadMessage(message);
    }
});
