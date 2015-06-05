var ScoreSceneLayer=cc.Layer.extend({
	scene:null,
	ctor:function () {
		this._super();
		var Score_Scene=ccs.load(res.Score_json);
		this.scene=Score_Scene;
		this.addChild(Score_Scene.node);
		var bt = ccui.helper.seekWidgetByName(Score_Scene.node, "Button_1");
		bt.addTouchEventListener(this.queren,this);
		var bt2 = ccui.helper.seekWidgetByName(Score_Scene.node, "Button_2");
		bt2.addTouchEventListener(this.exit,this);
	},
	onEnter:function(){
		this._super();
		this.scene.node.getChildByName("name").setString(APLAYER.name);
		this.scene.node.getChildByName("round").setString(CURRENTROUND);
	},
	queren:function(sender,type){
		if(type==ccui.Widget.TOUCH_BEGAN)
		{
			var id=this.scene.node.getChildByName("TextField_1");
			var s="{\"id\":\""+APLAYER.id+"\",\"id_game\":\""+ID_CURRENTGAME+"\",\"score\":"+this.text.getString()+"}";
			asocket.caculateScore(s);
			setTimeout(function(){cc.director.pushScene(new MainMenuScene())},1000);
		}
	},
	exit:function(sender,type){
		if(type==ccui.Widget.TOUCH_BEGAN)
		{
			cc.director.popScene();
		}
	}
});
var ScoreScene=cc.Scene.extend({
	ctor:function(){
		this._super()
	},
	onEnter:function () {
		this._super();
		var layer = new ScoreSceneLayer();
		this.addChild(layer);
	}
});