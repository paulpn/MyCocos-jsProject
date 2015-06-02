var _sioClient;
socketReturnValue=null;//由于查询需要时间，所以在socket.io的函数中使用返回值总是错误的，所以采用全局变量加settimeout的方式取代返回值
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
		_sioClient.emit("QuieryPunishrules","{}");
		var tmp={};
		tmp.args=ID_PLAYEROFTHISGAME;
		var s=JSON.stringify(tmp);
		_sioClient.emit("QuieryPlayerInfo",s);
		
		/*for(var i in ID_PLAYEROFTHISGAME)
			{
			PLAYERS[i]=new Player();
			PLAYERS[i].id=ID_PLAYEROFTHISGAME[i];
			_sioClient.emit("QuieryPlayerInfo",ID_PLAYEROFTHISGAME[i]);
			setTimeout(function(){
				PLAYERS[i].name=socketReturnValue;
				cc.log("%s",PLAYERS[i].name);},1000);

			}*/
		

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
	this._sioClient.on("GetPlayerInfo",function(data){
		var jsonObj=JSON.parse(data);
		var arg=jsonObj['args'];
		for(var i in ID_PLAYEROFTHISGAME)
			{
			PLAYERS[i]=new Player();
			PLAYERS[i].id=ID_PLAYEROFTHISGAME[i];
			PLAYERS[i].name=arg[0][i]['name'];
			cc.log("%s",PLAYERS[i].name);
			}
		
		//socketReturnValue=arg[0][0]['name'];
		
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
socket.prototype.caculateScore=function(scoreRecord){
	this._sioClient.emit("RecordScore",scoreRecord);
}
socket.prototype.getPlayerInfo=function(id){
	/*this._sioClient.emit("QuieryPlayerInfo",id);*/
	this._sioClient.on("GetPlayerInfo",function(data){
		cc.log("ttttttttttt");
	});
}