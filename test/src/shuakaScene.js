var ShuakaSceneLayer=cc.Layer.extend({
	tip:null,
	tt:null,
	ctor:function () {
		this._super();
		this.Shuaka_Scene=ccs.load(res.Shuaka_json);
		this.addChild(this.Shuaka_Scene.node);
		var bt = ccui.helper.seekWidgetByName(this.Shuaka_Scene.node, "Button_1");
		var cancelbt = ccui.helper.seekWidgetByName(this.Shuaka_Scene.node, "Button_2");
		var tip_position=this.Shuaka_Scene.node.getChildByName("tip").getPosition();
		this.tip = new cc.LabelTTF("", "宋体", 40);
		this.tip.setPosition(tip_position.x,tip_position.y);
		this.tip.setColor(cc.color(0, 0, 0));
		this.addChild(this.tip);
		switch(GL.ShuaKa)
		{
		case 0:
			this.tip.setString("请刷卡检录");
			bt.addTouchEventListener(this.gotojianluscene,this);
			cancelbt.addTouchEventListener(this.goback,this);
			break;
		case 1:
			this.tip.setString("请刷卡查询");
			bt.addTouchEventListener(this.gotochaxunscene,this);
			cancelbt.addTouchEventListener(this.goback,this);
			break;
		case 2:
			this.tip.setString("请选手刷卡");
			bt.addTouchEventListener(this.gototongjiscene,this);
			cancelbt.addTouchEventListener(this.goback,this);
			break;
		case 3:
			this.tip.setString("请选手刷卡确认");
			bt.addTouchEventListener(this.queren,this);
			cancelbt.addTouchEventListener(this.goback,this);
			break;
		case 4:
			this.tip.setString("请刷卡登录");
			bt.addTouchEventListener(this.gotomainmenuscene,this);
			cancelbt.addTouchEventListener(this.goback,this);
			break;
		}
	},
	gotojianluscene:function(sender,type){
		var tip=this.tip;
		if(type==ccui.Widget.TOUCH_BEGAN)
		{
			var id=this.Shuaka_Scene.node.getChildByName("TextField_1").getString();
			asocket.JianLu(id);
			setTimeout(function(){
				if(socketReturnValue==true)
					cc.director.pushScene(new PersonalInfoScene(id));
				else
					tip.setString("该用户没有报名参加本次比赛");
			},1000);
			
		}
	},
	gotochaxunscene:function(sender,type){
		var tip=this.tip;
		if(type==ccui.Widget.TOUCH_BEGAN)
			{
				var id=this.Shuaka_Scene.node.getChildByName("TextField_1").getString();
				asocket.checkAPlayer(id);
				setTimeout(function(){
				if(socketReturnValue==true)
					cc.director.pushScene(new PersonalInfoScene(id));
				else
					tip.setString("该用户没有报名参加本次比赛");
				},1000);
			}
	},
	gototongjiscene:function(sender,type){
		var tip=this.tip;
		if(type==ccui.Widget.TOUCH_BEGAN)
		{
			var id=this.Shuaka_Scene.node.getChildByName("TextField_1").getString();
			asocket.checkAPlayer(id);
			setTimeout(function(){
				if(socketReturnValue==true)
					cc.director.pushScene(new ScoreScene());
				else
					tip.setString("该用户没有报名参加本次比赛");
			},1000);
		}
	},
	gotomainmenuscene:function(sender,type){
		var tip=this.tip;
		if(type==ccui.Widget.TOUCH_BEGAN){
			var id=this.Shuaka_Scene.node.getChildByName("TextField_1").getString();
			asocket.checkjudgesID(id,ID_CURRENTGAME);
			setTimeout(function(){
				if(socketReturnValue==true)
					{
					asocket.getPlayerInfo();
					cc.director.pushScene(new MainMenuScene());
					}
					
				else{
					tip.setString("该用户没有报名参加本次比赛");//setTime中似乎不能用this,所以使用tip代替this.tip	
				}
					
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