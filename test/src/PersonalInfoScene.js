var PersonalInfoSceneLayer=cc.Layer.extend({
	scene:null,
	ctor:function () {
		this._super();
		var PersonalInfo_Scene=ccs.load(res.PersonalInfo_json);
		this.scene=PersonalInfo_Scene;
		this.addChild(PersonalInfo_Scene.node);
		var bt3 = ccui.helper.seekWidgetByName(PersonalInfo_Scene.node, "Button_1");
		bt3.addTouchEventListener(this.queren,this);
	},
	onEnter:function(){
		this._super();
		var p=getPlayerByID(this.getParent().id);
		this.scene.node.getChildByName("name").setString(p.name);
		this.scene.node.getChildByName("id").setString(p.id);
		this.scene.node.getChildByName("seatnumber").setString(p.seatNumber);
		var g=getGroupByNumber(p.groupNumber);
		this.scene.node.getChildByName("groupnumber").setString(g.groupNumber);
		this.scene.node.getChildByName("changdi").setString(g.changdiNumber);
	},
	queren:function(sender,type){
		if(type==ccui.Widget.TOUCH_BEGAN)
		cc.director.pushScene(new MainMenuScene());
	}
});

var PersonalInfoScene=cc.Scene.extend({
	id:null,
	ctor:function(id){
		this._super();
		this.id=id;
	},
	onEnter:function () {
		this._super();
		var layer = new PersonalInfoSceneLayer();
		this.addChild(layer);
	}
});
