var mysql = require('mysql');
var conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '794613',
	database:'diaoyu',
	port: 3306
});
conn.connect();
conn.query('select name from games', function(err, rows) {
	if (err) throw err;
	console.log("select==>");
	for(var i in rows)
	{
		console.log(rows[i]);
	}
});
conn.end();
