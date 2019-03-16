
module.exports = {
  


parseJSON: function (data, league, date) {
  	var returnJSON;
  	switch(league){
  		case "nhl":
  			return parseNHL(data);
  			break;
  		case "nba":
  			return parseNBA(data, date);
  			break;
  		default: 
  			return parseNHL(data);
  	}	
  }

};

// Build NHL JSON Object to send to front end
function parseNHL(data){
  	var datesArray = data["dates"];
  	var returnJSON = new Object;
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
  			var codedGameState = gameObject["status"]["codedGameState"];
  			if ( codedGameState == 1){
  				var gameDateObject = new Date(gameObject["gameDate"]);
  				var utcDate = new Date(gameDateObject.toUTCString());
					utcDate.setHours(utcDate.getHours()-4);
					var usDate = new Date(utcDate);
					var mins = (usDate.getMinutes()>9 ? '' : '0') + usDate.getMinutes()
					gameJSON.time_remaining = (usDate.getHours()%12) + ":" + mins + " ET";
  				gameJSON.started = false;
  			}
  			else {
  				gameJSON.started = true;
  			}

  			// Fields for game details
  			gameJSON.home_team_id = gameJSON.away_num_wins = gameObject["teams"]["home"]["team"]["id"];

				gameJSON.home_num_wins = gameObject["teams"]["away"]["leagueRecord"]["wins"];
				gameJSON.home_num_losses = gameObject["teams"]["away"]["leagueRecord"]["losses"];
				gameJSON.home_num_otl = gameObject["teams"]["away"]["leagueRecord"]["ot"];
				gameJSON.home_period1_goals = 0;
				gameJSON.home_period2_goals = 0;
				gameJSON.home_period3_goals = 0;
				gameJSON.home_logo_link = "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/" 
					+ gameJSON.home_team_id + ".svg";

				gameJSON.away_team_id = gameJSON.away_num_wins = gameObject["teams"]["away"]["team"]["id"];

				gameJSON.away_num_wins = gameObject["teams"]["away"]["leagueRecord"]["wins"];
				gameJSON.away_num_losses = gameObject["teams"]["away"]["leagueRecord"]["losses"];
				gameJSON.away_num_otl = gameObject["teams"]["away"]["leagueRecord"]["ot"];
				gameJSON.away_period1_goals = 0;
				gameJSON.away_period2_goals = 0;
				gameJSON.away_period3_goals = 0;
				gameJSON.away_logo_link = "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/" 
					+ gameJSON.away_team_id + ".svg";


  			gameJSON.date = stringDate;
  			gamesJSONArray.push(gameJSON);
  		}
  		returnJSON.games = gamesJSONArray;
  	}
  	return returnJSON;
}


// Build NBA Json object to send to front end
function parseNBA(data, date){
		var gamesArray = data["games"];
		var returnJSON = new Object;
		var gamesJSONArray = [];
		for (var i = 0; i<gamesArray.length; i++){
			var gameJSON = new Object;
			var gameObject = gamesArray[i];
			
			// Fields for Scores page
			gameJSON.nugget = gameObject["nugget"]["text"];
		  gameJSON.home_team = gameObject["hTeam"]["triCode"];
			gameJSON.home_score = parseInt(gameObject["hTeam"]["score"]);
			gameJSON.away_team = gameObject["vTeam"]["triCode"];
			gameJSON.away_score = parseInt(gameObject["vTeam"]["score"]);
			var isGameActivated = gameObject["isGameActivated"];
			(isGameActivated) ? gameJSON.time_remaining = "Live" : gameJSON.time_remaining = "Final";
			if (gameObject["statusNum"] == 1){
				gameJSON.time_remaining = gameObject["startTimeEastern"];
				gameJSON.started = false;
				gameJSON.nugget = "Game will start at " + gameJSON.time_remaining;
			}
			if (gameObject["statusNum"] == 2 || gameObject["statusNum"] == 3){
				gameJSON.started = true;
			}
			gameJSON.date = date; 

			gamesJSONArray.push(gameJSON);
		}
		returnJSON.games = gamesJSONArray;
		return returnJSON;
}