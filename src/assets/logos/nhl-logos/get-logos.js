var fs = require('fs'),
request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};




for (var i = 0; i<31; i++){
	var url = "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/"
		+ i + ".svg";
	download(url, i+".svg", function(){
	});
}
