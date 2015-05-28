var _sioClient;
tag=0;
socket=function()
{
	this._sioClient;
	this.SocketIO = SocketIO || io;
}
socket.prototype.init=function(){
	this._sioClient=this.SocketIO.connect("http://localhost:3000/");
	_sioClient=this._sioClient;
	this._sioClient.on("connect",function(){
		_sioClient.emit("QuieryInitGameData","{}");

	});
	this._sioClient.on("GetInitGameData",function(data){
		var jsonObj=JSON.parse(data);
		var arg=jsonObj['args'];
		var arg_arg=arg[0];
		for(var i in arg_arg)
		NAME_GAMEOFTODAY[i]=arg_arg[i]['name'];
		cc.director.runScene(new LoginScene());
		//if(_sioClient != null)_sioClient.disconnect();
	});
}
socket.prototype.checkjudgesID=function(id){
	
	//this._sioClient=this.SocketIO.connect("http://localhost:3000/");
	_sioClient=this._sioClient;
	_sioClient.emit("CheckJudgesID",id);
	//this._sioClient.on("connect",function(){
		
	//});
	_sioClient.on("GetResult",function(data){
		var jsonObj=JSON.parse(data);
		var arg=jsonObj['args'];
		tag=1;
		/*if(arg=='1')
			cc.director.pushScene(new MainMenuScene());
		else
		{
			cc.director.popScene();
		}*/
	});
}