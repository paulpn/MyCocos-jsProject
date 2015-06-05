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
		_sioClient.emit("QueryInitGameData","{}");
		_sioClient.emit("QueryPunishrules","{}");
		/*var tmp={};
		tmp.args=ID_PLAYEROFTHISGAME;
		var s=JSON.stringify(tmp);
		_sioClient.emit("QueryPlayerInfo",s);
		
		/*for(var i in ID_PLAYEROFTHISGAME)
			{
			PLAYERS[i]=new Player();
			PLAYERS[i].id=ID_PLAYEROFTHISGAME[i];
			_sioClient.emit("QueryPlayerInfo",ID_PLAYEROFTHISGAME[i]);
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
	/*this._sioClient.on("GetPlayerInfo",function(data){
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
		
	});*/
	
}
socket.prototype.checkjudgesID=function(judge_id,game_id){
	var json={};
	json.judge_id=judge_id;
	json.game_id=game_id;
	var s=JSON.stringify(json);
	this._sioClient.emit("CheckJudgesID",s);
	this._sioClient.on("GetResult",function(data){
		var jsonObj=JSON.parse(data);
		var arg=jsonObj['args'];
		if(arg[0]!='0')
			{
			USERID=judge_id;
			USERNAME=arg[1][0]["name"];
			cc.log("%s",USERNAME);
			for(var i in arg[1])
				{
				CHANGDI[i]=arg[1][i]["changdi"];
				}
			socketReturnValue=true;
			}
			
		else
			socketReturnValue=false;
	});

}
socket.prototype.punishment=function(side,seat,punishment){
	var json={};
	json.side=side;
	json.seat=seat;
	json.game_id=ID_CURRENTGAME;
	json.round=CURRENTROUND;
	json.judge_id=USERID;
	json.punishment=punishment;
	json.changdi=CHANGDI[CURRENTROUND-1];
	var s=JSON.stringify(json);
	this._sioClient.emit("GetAPunishment",s);
}
socket.prototype.caculateScore=function(scoreRecord){
	this._sioClient.emit("RecordScore",scoreRecord);
}
socket.prototype.getPlayerInfo=function(){
	/*var tmp={};
	tmp.args=ID_PLAYEROFTHISGAME;
	var s=JSON.stringify(tmp);
	_sioClient.emit("QueryPlayerInfoByIDs",s);
	
	this._sioClient.on("GetPlayerInfo2",function(data){
		var jsonObj=JSON.parse(data);
		var arg=jsonObj['args'];
		for(var i in ID_PLAYEROFTHISGAME)
		{
			PLAYERS[i]=new Player();
			PLAYERS[i].id=ID_PLAYEROFTHISGAME[i];
			PLAYERS[i].name=arg[0][i]['name'];
			cc.log("%s",PLAYERS[i].name);
		}

	});*/
	this._sioClient.emit("QueryPlayerInfo",ID_CURRENTGAME);

	this._sioClient.on("GetPlayerInfo",function(data){
		PLAYERS=[];
		var jsonObj=JSON.parse(data);
		var arg=jsonObj['args'];
		for(var i in arg[0])
		{
			PLAYERS[i]=new Player();
			PLAYERS[i].id=arg[0][i]['id'];
			PLAYERS[i].name=arg[0][i]['name'];
			cc.log("%s",PLAYERS[i].name);
		}

	});

	
}
socket.prototype.JianLu=function(id){
	var json={};
	json.id=id;
	json.game_id=ID_CURRENTGAME;
	json.round=CURRENTROUND;
	var s=JSON.stringify(json);
	this._sioClient.emit("JianLu",s);
	this._sioClient.on("JianLuResult",function(data){
		var jsonObj=JSON.parse(data);
		var arg=jsonObj['args'];
		if(arg[0]=='1')
			{
			socketReturnValue=true;	
			_sioClient.emit("GetAPlayerInfo",s);
			}	
		else
			socketReturnValue=false;
		//_sioClient.emit("GetAPlayerInfoByID",id);
		
		
	})
	this._sioClient.on("GetAPlayerInfo",function(data){
		APLAYER=null;
		jsonObj=JSON.parse(data);
		arg=jsonObj['args'];
		APLAYER=new Player();
		APLAYER.id=arg[0][0]['id'];
		APLAYER.name=arg[0][0]['name'];
		APLAYER.groupNumber=arg[0][0]['group_id']
		APLAYER.changdiNumber=arg[0][0]['changdi'];
		APLAYER.seatNumber=arg[0][0]['seat'];
	});
}
socket.prototype.checkAPlayer=function(id){
	var json={};
	json.id=id;
	json.game_id=ID_CURRENTGAME;
	json.round=CURRENTROUND;
	var s=JSON.stringify(json);
	this._sioClient.emit("GetAPlayerInfo",s);
	this._sioClient.on("GetAPlayerInfo",function(data){
		APLAYER=null;
		jsonObj=JSON.parse(data);
		arg=jsonObj['args'];
		if(arg[0].length==0)
			socketReturnValue=false;
		else
		{
			socketReturnValue=true;
			APLAYER=new Player();
			APLAYER.id=arg[0][0]['id'];
			APLAYER.name=arg[0][0]['name'];
			APLAYER.groupNumber=arg[0][0]['group_id']
			APLAYER.changdiNumber=arg[0][0]['changdi'];
			APLAYER.seatNumber=arg[0][0]['seat'];
		}
	});
}