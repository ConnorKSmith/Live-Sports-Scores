
module.exports = {
  


  parseJSON: function (data, league) {	
  	//console.log(data);
  	var datesArray = data["dates"];
  	var returnJSON = new Object;
  	//console.log(datesArray);
  	for (var i = 0; i<datesArray.length; i++){
  		var dateObject = datesArray[i];
  		var stringDate = dateObject["date"];
  		var gamesArray = dateObject["games"];
  		var gamesJSONArray = [];
  		for (var j = 0; j<gamesArray.length; j++){
  			var gameObject = gamesArray[j];
  			var gameJSON = new Object;
  			gameJSON.home_team = gameObject["teams"]["home"]["team"][
  			"name"];
  			gameJSON.home_score = gameObject["teams"]["home"]["score"];
  			gameJSON.away_team = gameObject["teams"]["away"]["team"][
  			"name"];
  			gameJSON.away_score = gameObject["teams"]["away"]["score"];
  			gameJSON.time_remaining = gameObject["status"]["abstractGameState"];
  			gameJSON.date = stringDate;
  			gamesJSONArray.push(gameJSON);
  		}
  		returnJSON.games = gamesJSONArray;
  	}
  	return returnJSON;
  }




};