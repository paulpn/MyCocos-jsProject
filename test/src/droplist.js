
var droplist_Item=cc.Sprite.extend({
	data:null,
	number:null,
	ctor:function(aTexture){
		this._super(aTexture);
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.onTouchBegan//只能用这个名，不能改，否则不触发
		},this);
	},
	onTouchBegan:function(touch,event){
		var target = event.getCurrentTarget();//event.getCurrentTarget()返回的是接受触碰事件的层，没有这一句会报错Assert failed: the return value of onTouchBegan isn't boolean
		var s=target.getContentSize();
		var rect = cc.rect(0, 0, s.width, s.height);
		//var s=target.getBoundingBox();
		var touchpoint=target.convertToNodeSpace(touch.getLocation());
		if (cc.rectContainsPoint(rect, touchpoint)&&target.getParent().isVisible())
		{
			target.data=target.getChildByName("value").getString();//用target而不用this
			target.getData();//不能用this
			target.getParent().setVisible(false);
			return true;
		}
		return false;
	},
	getData:function()//将选中的值作为下拉列表的值
	{
		cc.log("dddddddddddddddthis.number的值为%s",this.number);
		this.getParent().getParent().setSelectData(this.data,this.number);//使用自定义方法setSelectData，同时改变实际值和显示的值
		cc.log("%s",this.getParent().getParent().value);
		
	}
	
});


var droplist=cc.Sprite.extend({
	dataSource:null,
	value:null,
	selectedText:null,
	number:1,
	ctor:function(aTexture,dataSource_arry){//下拉列表中的数据项数
		dataSource=dataSource_arry;
		this.value=dataSource_arry[0];
		this._super(aTexture);
		this.selectedText= new cc.LabelTTF(this.value, "宋体", 20);
		this.selectedText.setPosition(this._getWidth()/2,this._getHeight()/2);
		this.selectedText.setColor(cc.color(0, 0, 0));
		this.selectedText.setName("value");//起名
		this.addChild(this.selectedText);
		listcontainer=new cc.Sprite();
		this.addChild(listcontainer);
		listcontainer.setName("listcontainer");
		for(i=1;i<=dataSource.length;i++)
		{
			var item=new droplist_Item("res/blank.png");
			item.number=i;
			item.setAnchorPoint(0, 0);
			this.item_h=item._getHeight();
			this.item_w=item._getWidth();
			item.setPosition(0, -this._getHeight()-(this.item_h)*(i-1));
			item.convertToNodeSpaceAR(listcontainer.getPosition());
			listcontainer.addChild(item);
			var str=dataSource[i-1];
			var label = new cc.LabelTTF(str, "宋体", 20);
			label.setPosition(this.item_w/2,this.item_h/2);
			label.setColor(cc.color(0, 0, 0));
			label.setName("value");//起名
			item.addChild(label);
			
		}
		listcontainer.setVisible(false);
		//cc.log("%s",value);
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.onTouchBegan
		},this);
	},
	onTouchBegan:function(touch,event){
		var target = event.getCurrentTarget();//event.getCurrentTarget()返回的是接受触碰事件的层，没有这一句会报错Assert failed: the return value of onTouchBegan isn't boolean
		var size=target.getContentSize();
		//var s=target.getBoundingBox();
		var touchpoint=target.convertToNodeSpace(touch.getLocation());
		var rect = cc.rect(0, 0, size.width, size.height);
		if (cc.rectContainsPoint(rect, touchpoint))
		{
			target.getChildByName("listcontainer").setVisible(true);
			return true;
		}
		var rect2 = cc.rect(0, -(size.height+dataSource.length*this.item_h), size.width, size.height+dataSource.length*this.item_h);
		if (!cc.rectContainsPoint(rect2, touchpoint))//点空白处，下拉框消失
			{
			target.getChildByName("listcontainer").setVisible(false);
			}
		
		return false;
	},
	setSelectData:function(data,number)
	{
		this.value=data;
		this.number=number;
		this.selectedText.setString(data);
	}

});
