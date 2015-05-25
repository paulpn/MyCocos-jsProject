var ScoreSceneLayer=cc.Layer.extend({
	scene:null,
	ctor:function () {
		this._super();
		var Score_Scene=ccs.load(res.Score_json);
		this.scene=Score_Scene;
		this.addChild(Score_Scene.node);
		var bt = ccui.helper.seekWidgetByName(Score_Scene.node, "Button_1");
		bt.addTouchEventListener(this.queren,this);
	},
	onEnter:function(){
		this._super();
		var id=this.getParent().id
		var p=getPlayerByID(id);
		this.scene.node.getChildByName("name").setString(p.name);
		this.scene.node.getChildByName("round").setString(CURRENTROUND);
		var punishmentlist=getPunishmentListByID(id);
		this.scene.node.getChildByName("round").setString(CURRENTROUND);
	},
	queren:function(sender,type){
		if(type==ccui.Widget.TOUCH_BEGAN)
		cc.director.pushScene(new MainMenuScene());
	}
});
var ScoreScene=cc.Scene.extend({
	id:null,
	onEnter:function () {
		this._super();
		var layer = new ScoreSceneLayer();
		this.addChild(layer);
	}
});