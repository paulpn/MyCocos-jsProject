var LoginSceneLayer=cc.Layer.extend({
	gamename_drop:null,
	ctor:function () {
		this._super();
		var Login_Scene=ccs.load(res.Login_json);
		this.addChild(Login_Scene.node);
		var bt = ccui.helper.seekWidgetByName(Login_Scene.node, "Button_1");
		bt.addTouchEventListener(this.shuaka,this);
		var sides=[];
		sides[0]="1边";
		sides[1]="2边";
		this.gamename_drop=new droplist("res/blank.png",sides);
		//this.gamename_drop=new droplist("res/blank.png",NAME_GAMEOFTODAY);
		var p=Login_Scene.node.getChildByName("dropdownlist_position");//获取下拉列表的位置
		this.gamename_drop.setPosition(p.getPosition());
		this.addChild(this.gamename_drop,0);
	},
	shuaka:function(sender,type){
		
		GL.ShuaKa=GL.ShuaKa_ENUM.Login;
		if(type==ccui.Widget.TOUCH_BEGAN)
			{
			CURRENTGAME=this.gamename_drop.value;
			cc.director.pushScene(new ShuakaScene());
			}
	}
});
var LoginScene=cc.Scene.extend({
	onEnter:function () {
		this._super();
		
		var layer = new LoginSceneLayer();
		this.addChild(layer);
	}
});