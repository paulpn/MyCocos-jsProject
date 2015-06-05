
var MainMenuLayer = cc.Layer.extend({
    sprite:null,
    wsiSendText:null,
    ctor:function () {
        this._super();
        this._wsiSendText = new WebSocket("ws://echo.websocket.org");
        this._wsiSendText.onopen=function(evt) {
        	cc.log("Send Text WS was opened.");
        };
        this._wsiSendText.onmessage=function(evt) {
        	var textStr = "response text msg: "+evt.data;
        	cc.log(textStr);
        };
        this._wsiSendText.onerror =function(evt) {
        	cc.log("sendText Error was fired");
        };
        this._wsiSendText.onclose =function(evt) {
        	cc.log("_wsiSendText websocket instance closed.");
        };
        
        var size = cc.winSize;
        cc.log("裁判id为%s",USERID);
        var menu_scene=ccs.load(res.Menu_json);
        this.addChild(menu_scene.node);
        this.timetext=menu_scene.node.getChildByName("Text_2");
        this.schedule(this.update, 1);//设置定时器，每隔1秒执行update方法一次
        menu_scene.node.getChildByName("username").setString(USERNAME);
        var bt1 = ccui.helper.seekWidgetByName(menu_scene.node, "Button_1");//从mainscene场景中获取名为Button1的组件
        bt1.addTouchEventListener(this.jianlu,this);
        var bt2 = ccui.helper.seekWidgetByName(menu_scene.node, "Button_2");
        bt2.addTouchEventListener(this.chaxun,this);
        var bt3 = ccui.helper.seekWidgetByName(menu_scene.node, "Button_3");
        bt3.addTouchEventListener(this.tongfen,this);
        var bt4 = ccui.helper.seekWidgetByName(menu_scene.node, "Button_4");
        bt4.addTouchEventListener(this.GameStart,this);
        var p1=new Player("chen","1001");
        var bt5 = ccui.helper.seekWidgetByName(menu_scene.node, "Button_5");
        bt5.addTouchEventListener(this.clicksendmessage,this);
        var bt6 = ccui.helper.seekWidgetByName(menu_scene.node, "Button_6");
        bt6.addTouchEventListener(this.logout,this);
        //为bt注册一个触碰事件监听者，当监听到bt被触碰，则执行自定义函数buttonTouchEvent（）
        //bt.addTouchEventListener(this.prints());
       /* var bt=new cc.MenuItemImage("res/4.png","res/4.png",this.onclick,this);
        var menu=new cc.Menu.create(bt);
        this.addChild(menu);
        return true;*/
    },
    clicksendmessage:function(){
    	if (this._wsiSendText.readyState == WebSocket.OPEN)
    	{
    		cc.log("Send Text WS is waiting...");
    		this._wsiSendText.send("Hello WebSocket中文, I'm a text message.");
    	}
    	else
    	{
    		var warningStr = "send text websocket instance wasn't ready...";
    		cc.log(warningStr);

    	}
    },
    //Button控件触发的事件处理
   buttonTouchEvent:function(sender,type){//sender是触发事件的控件，type是事件的类型
    	//根据触发事件的类型进行分情况处理，从控制台输出cc.log();
    	switch (type) {
    	case ccui.Widget.TOUCH_BEGAN:
    		cc.log("loginButton Touch Began");
    		break;
    	case ccui.Widget.TOUCH_MOVED:
    		cc.log("loginButton Touch Moved");
    		break;
    	case ccui.Widget.TOUCH_ENDED:
    		cc.log("loginButton Touch Ended");
    		break;
    	case ccui.Widget.TOUCH_CANCELED:
    		cc.log("loginButton Touch Canceled");
    		break;
    	default:
    		break;
    	}

    },
    jianlu:function(sender,type)
    {
    	date=new Date();
    	if(type==ccui.Widget.TOUCH_BEGAN&&(date<GAMESTARTTIME)){
    		GL.ShuaKa=GL.ShuaKa_ENUM.JIANLU;
    		cc.director.pushScene(new ShuakaScene());
    	}
    },
    chaxun:function(sender,type)
    {
    	if(type==ccui.Widget.TOUCH_BEGAN){
    		GL.ShuaKa=GL.ShuaKa_ENUM.CHAXUN;
    		cc.director.pushScene(new ShuakaScene());
    	}
    },
    tongfen:function(sender,type)
    {
    	if(type==ccui.Widget.TOUCH_BEGAN){
    		GL.ShuaKa=GL.ShuaKa_ENUM.TONGFEN;
    		cc.director.pushScene(new ShuakaScene());
    	}
    },
    GameStart:function(sender,type)
    {
    	if(type==ccui.Widget.TOUCH_BEGAN){
    		cc.director.pushScene(new JudgeScene());
    	}	
    },
    logout:function(sender,type)
    {
    	if(type==ccui.Widget.TOUCH_BEGAN){
    		cc.director.pushScene(new LoginScene());
    	}	
    },
    update:function () {
    	var time=new Date();
    	//cc.log("%s",time.toLocaleTimeString());
    	this.timetext.setString(time.toLocaleTimeString());
    	/*cc.log("%s",shouchiji.aaa);//这里的shouchiji并不是shouchiji.js中的aaa，而是shuakaScene中的shouchiji.aaa
    	  shouchiji.print();//这种情况下，也无法使用shouchiji.js中定义个方法
    	  综合以上两者，可以推知，我们这里的shouchiji与shouchiji.js中定义的var shouchiji是有区别的
    	 */
    }

	/*onclick:function()
	{
		cc.log("cc");
		
	}*/
    
});

var MainMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});

