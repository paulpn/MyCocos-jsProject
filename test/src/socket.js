var _sioClient;
socketReturnValue=null;//由于查询需要时间，所以在socket.io的函数中使用返回值总是错误的，所以采用全局变量加settimeout的方式取代返回值
socket=function()
{
	this._sioClient;
	this.SocketIO = SocketIO || io;
}
socket.prototype.init=function(){
	this._sioClient=this.SocketIO.connect("http://192.168.1.133:3000/");
	_sioClient=this._sioClient;
	this._sioClient.on("connect",function(){
		_sioClient.emit("QuieryInitGameData","{}");
		_sioClient.emit("QuieryPunishrules","{}");

	});
	this._sioClient.on("GetInitGameData",function(data){
		var jsonObj=JSON.parse(data);
		var arg=jsonObj['args'];
		for(var i in arg[0])
		{
			ID_GAMEOFTODAY[i]=arg[0][i]['id'];
			NAME_GAMEOFTODAY[i]=arg[0][i]['name'];
		}
		//if(_sioClient != null)_sioClient.disconnect();
	});
	this._sioClient.on("GetPunishRules",function(data){
		var jsonObj=JSON.parse(data);
		var arg=jsonObj['args'];
		for(var i in arg[0])
		{
			PUNISHMENTS[i]=arg[0][i]['content'];
		}
	});
}
socket.prototype.checkjudgesID=function(id){
	this._sioClient.emit("CheckJudgesID",id);
	this._sioClient.on("GetResult",function(data){
		var jsonObj=JSON.parse(data);
		var arg=jsonObj['args'];
		if(arg[0]=='1')
			{
			USERID=id;
			USERNAME=arg[1][0]["name"];
			cc.log("%s",USERNAME);
			socketReturnValue=true;
			}
			
		else
			socketReturnValue=false;
	});

}
socket.prototype.punishment=function(data){
	this._sioClient.emit("GetAPunishment",data);
}