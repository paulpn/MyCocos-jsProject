var ShuakaSceneLayer=cc.Layer.extend({
	info:"1002",
	ctor:function () {
		this._super();
		var Shuaka_Scene=ccs.load(res.Shuaka_json);
		this.addChild(Shuaka_Scene.node);
		var bt = ccui.helper.seekWidgetByName(Shuaka_Scene.node, "Button_1");
		var cancelbt = ccui.helper.seekWidgetByName(Shuaka_Scene.node, "Button_2");
		var tip_position=Shuaka_Scene.node.getChildByName("tip").getPosition();
		tip = new cc.LabelTTF("", "宋体", 40);
		tip.setPosition(tip_position.x,tip_position.y);
		tip.setColor(cc.color(0, 0, 0));
		this.addChild(tip);
		this.info=null;
		this.schedule(this.getInfo,0.5);
		switch(GL.ShuaKa)
		{
		case 0:
			tip.setString("请刷卡检录");
			bt.addTouchEventListener(this.gotojianluscene,this);
			cancelbt.addTouchEventListener(this.goback,this);
			break;
		case 1:
			tip.setString("请刷卡查询");
			bt.addTouchEventListener(this.gotochaxunscene,this);
			cancelbt.addTouchEventListener(this.goback,this);
			break;
		case 2:
			tip.setString("请选手刷卡");
			bt.addTouchEventListener(this.gototongjiscene,this);
			cancelbt.addTouchEventListener(this.goback,this);
			break;
		case 3:
			tip.setString("请选手刷卡确认");
			bt.addTouchEventListener(this.queren,this);
			cancelbt.addTouchEventListener(this.goback,this);
			break;
		case 4:
			tip.setString("请刷卡登录");
			bt.addTouchEventListener(this.gotomainmenuscene,this);
			cancelbt.addTouchEventListener(this.goback,this);
			break;
		}
	},
	gotojianluscene:function(sender,type){
		if(type==ccui.Widget.TOUCH_BEGAN)
		{
			id="1111";//测试用
			cc.director.pushScene(new PersonalInfoScene(id));
		}
	},
	gotochaxunscene:function(sender,type){
		if(type==ccui.Widget.TOUCH_BEGAN)
			{
			id="1111";//测试用
			cc.director.pushScene(new PersonalInfoScene(id));
			}
	},
	gototongjiscene:function(sender,type){
		if(type==ccui.Widget.TOUCH_BEGAN)
		{
			id="1111";
			cc.director.pushScene(new ScoreScene(id));
		}
	},
	gotomainmenuscene:function(sender,type){
		if(type==ccui.Widget.TOUCH_BEGAN){
			asocket.checkjudgesID(this.info);
			setTimeout(function(){
				if(socketReturnValue==true)
					cc.director.pushScene(new MainMenuScene());
				else
					cc.director.popScene();
			},1000);
			
		}
		
	},
	gotologinscene:function(sender,type){
		if(type==ccui.Widget.TOUCH_BEGAN)
		cc.director.pushScene(new LoginScene());
	},
	goback:function(sender,type){
		if(type==ccui.Widget.TOUCH_BEGAN)
		cc.director.popScene();
	},
	
	getInfo:function(){
		if(this.info==null)
			{
			this.info="1001";
			cc.log("getINFO");
			}
	},
	print:function(s){
		cc.log("%s",s);
	}
});
var ShuakaScene=cc.Scene.extend({
	onEnter:function () {
		this._super();
		
		var layer = new ShuakaSceneLayer();
		this.addChild(layer);
	}
});