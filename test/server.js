var mysql = require('mysql');
var conn = mysql.createConnection({
	host: 'localhost',
	user: 'paul',
	password: '123456',
	database:'diaoyu',
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
						conn.connect();
						conn.query(
							'SELECT name from games',
							function(err, rows, fields)
							{    if (err)
								throw err;
								socket.emit('GetInitGameData',rows);
							}
						);
						//conn.end();
		    		});
			socket.on('CheckJudgesID', function (data)
			{
				console.log("xxxxxxxxxxxx");
				//conn.connect();
				conn.query(
					'SELECT * from judges where id='+data,
					function(err, rows, fields)
					{    if (err)
						throw err;
						if(rows.length==0)
						console.log(rows.length);
						else console.log(rows.length);
						socket.emit('GetResult',rows.length);
					}
				);
				conn.end();
			});

		});

