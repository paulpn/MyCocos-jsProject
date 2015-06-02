var mysql = require('mysql');
var conn = mysql.createConnection({
	host: 'localhost',
	user: 'paul',
	password: '123456',
	database:'fishingrace',
	port: 3306
});





var io = require('socket.io').listen(3000);
console.log('Server on port 3000.');

io.sockets.on('connection', function (socket) 
		{
			//向客户端发送消息
		    socket.send('Hello Cocos2d-JS');
			//注册客户端消息
		    socket.on('message', function (data) 
		    {
		        console.log(data);
		    });
		    socket.on('QuieryInitGameData', function (data)
		    		{
						conn = mysql.createConnection(conn.config);
						conn.connect();
						conn.query(
							'SELECT * from games',
							function(err, rows, fields)
							{    if (err)
								throw err;
								if(rows instanceof Object)
									console.log("Object");
								else console.log("string");
								socket.emit('GetInitGameData',rows);
							}
						);
						conn.end();
		    		});
			socket.on('CheckJudgesID', function (data)
			{
				conn = mysql.createConnection(conn.config);
				conn.connect();
				conn.query(
					'SELECT * from judges where id='+data,
					function(err, rows, fields)
					{    if (err)
						throw err;
						if(rows.length==0)
						console.log(rows.length);
						else console.log(rows.length);
						socket.emit('GetResult',rows.length,rows);
					}
				);
				conn.end();
			});
			socket.on('QuieryPunishrules', function ()
			{
				conn = mysql.createConnection(conn.config);
				conn.connect();
				conn.query(
					'SELECT * from punishrules ',
					function(err, rows, fields)
					{    if (err)
						throw err;
						socket.emit('GetPunishRules',rows);
					}
				);
				conn.end();
			});
			socket.on('GetAPunishment', function (data)
			{
				console.log('bbbbbbbbbbbbbbbbbbbbbbbbb');
				if(data instanceof Object)
				console.log("Json Object");
				else console.log("string");

				//var jsonObj=JSON.parse(data);
				//var arg=data['args'];
				console.log(data['side']);
			});
			socket.on('RecordScore', function (data)
			{
				console.log("RecordScore");
				conn.query(
					'insert into personal_score (id,id_game,score)values('+data['id']+','+data['id_game']+','+data['score']+')',
					function(err, rows, fields)
					{    if (err)
						throw err;
						socket.emit('GetPunishRules',rows);
					}
				);
			});
			socket.on('QuieryPlayerInfo', function (data)
			{
				conn = mysql.createConnection(conn.config);
				conn.connect();
				console.log("QuieryPlayerInfo");
				var data=data['args'];
				var tmp=[];
				var n=0;
				for(var i in data)
				{
					conn.query(
						'SELECT * from players where id='+data[i],
						function(err, rows, fields)
						{    if (err)
							throw err;
							tmp[n++]=rows[0];

						});
				}
				conn.query(
					'',
					function()
					{
						socket.emit('GetPlayerInfo',tmp);
					});
				conn.end();
			});
		});

