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
		this.scene.node.getChildByName("name").setString(APLAYER.name);
		this.scene.node.getChildByName("id").setString(APLAYER.id)
		this.scene.node.getChildByName("seatnumber").setString(APLAYER.seatNumber);
		this.scene.node.getChildByName("groupnumber").setString(APLAYER.groupNumber);
		this.scene.node.getChildByName("changdi").setString(APLAYER.changdiNumber);
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
