

JudgeLayer=cc.Layer.extend({
	scene:null,
	ctor:function(){
		this._super();
		var Judge_Scene=ccs.load(res.Judge_json);
		this.scene=Judge_Scene;
		this.addChild(Judge_Scene.node);
		var bt1 = ccui.helper.seekWidgetByName(Judge_Scene.node, "Button_1");//从mainscene场景中获取名为Button1的组件
		bt1.addTouchEventListener(this.queren,this);
		var bt2 = ccui.helper.seekWidgetByName(Judge_Scene.node, "Button_2");//从mainscene场景中获取名为Button1的组件
		bt2.addTouchEventListener(this.exit,this);
		var sides=[];
		sides[0]="1边";
		sides[1]="2边";
		this.sides_drop=new droplist("res/blank.png",sides);
		var p1=Judge_Scene.node.getChildByName("side").getChildByName("dropdownlist_position");//获取下拉列表的位置
		this.sides_drop.setPosition(p1.getPosition());
		this.addChild(this.sides_drop,0);
		var seats=[];
		seats[0]="1号";
		seats[1]="2号";
		seats[2]="3号";
		seats[3]="4号";
		this.seats_drop=new droplist("res/blank.png",seats);
		var p2=Judge_Scene.node.getChildByName("seat_number").getChildByName("dropdownlist_position");
		this.seats_drop.setPosition(p2.getPosition());
		this.addChild(this.seats_drop,-1);
		this.punishments_drop=new droplist("res/blank.png",PUNISHMENTS);
		var p3=Judge_Scene.node.getChildByName("punish_reason").getChildByName("dropdownlist_position");
		this.punishments_drop.setPosition(p3.getPosition());
		this.addChild(this.punishments_drop,-2);
	},
	onEnter:function(){
		this._super();
		this.scene.node.getChildByName("round").setString(CURRENTROUND);
	},
	queren:function(sender,type){
		if(type==ccui.Widget.TOUCH_BEGAN)
			{
			//var p="{\"side\":\""+this.sides_drop.value+"\",\"seats\":\""+this.seats_drop.value+"\",\"punish\":\""+this.punishments_drop.value+"\"}";
			var p={};
			p.side=this.sides_drop.value;
			p.seats=this.seats_drop.value;
			p.punish=this.punishments_drop.value;
				//var p="\"Hello!!!!!!!!\"";
			asocket.punishment("\""+p+"\"");
			//cc.director.pushScene(new MainMenuScene());
			}
	},
	exit:function(sender,type){
		if(type==ccui.Widget.TOUCH_BEGAN)
			cc.director.popScene();
	}
});

var JudgeScene=cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new JudgeLayer();
		this.addChild(layer);
	}
});