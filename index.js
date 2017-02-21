var fs = require('fs');
var mysql = require('mysql');

var config = JSON.parse(fs.readFileSync("config-secret.json"))

var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	port: config.port,
    database: config.database
});

connection.connect();

/*Find out how many todo items are on the list*/
connection.query('SELECT count(*) AS count FROM todos', function (error, results, fields) {
    if (error) throw error;
    console.log('\nFind out how many todo items are on the list');
    //console.log('count = ', results[0].count);
    results.forEach(function (item) {
      console.log('count = ', item.count);
    });
    
});

/*Find all the todo items that are marked as done*/
connection.query('SELECT Id, Done, Name FROM todos WHERE Done = TRUE', function (error, results, fields) {
    if (error) throw error;
    console.log('\nFind all the todo items that are marked as done');
    results.forEach(function (item) {
      console.log(item.Id, item.Done, item.Name);
    });
    //console.log(results);
    
});

/*Find all the todo items that are not marked as done*/
connection.query('SELECT Id, Done, Name FROM todos WHERE Done != TRUE', function (error, results, fields) {
    if (error) throw error;
    console.log('\nFind all the todo items that are not marked as done');
    results.forEach(function (item) {
      console.log(item.Id, item.Done, item.Name);
    });
    //console.log(results);
    
});

/*Get all the todo items, sorted with the most recent first*/
connection.query('SELECT Id, Done, Name FROM todos ORDER BY id DESC', function (error, results, fields) {
    if (error) throw error;
    console.log('\nGet all the todo items, sorted with the most recent first');
    results.forEach(function (item) {
      console.log(item.Id, item.Done, item.Name);
    });
    //console.log(results);
    
});

/*Get the single most recently added todo item*/
connection.query('SELECT Id, Done, Name FROM todos ORDER BY id DESC LIMIT 1', function (error, results, fields) {
    if (error) throw error;
    console.log('\nGet the single most recently added todo item');
    results.forEach(function (item) {
      console.log(item.Id, item.Done, item.Name);
    });
    //console.log(results);
    
});

/*Get all todo items about "databases"*/
connection.query('SELECT Id, Done, Name FROM todos WHERE Name LIKE "%database%"', function (error, results, fields) {
    if (error) throw error;
    console.log('\nGet all todo items about "databases"');
    results.forEach(function (item) {
      console.log(item.Id, item.Done, item.Name);
    });
    //console.log(results);
});

connection.end();
