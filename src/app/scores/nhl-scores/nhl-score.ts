export class NhlScore {
	_id?: string;

	home_team_id: number;
	home_team: string;
	home_num_wins: number;
	home_num_losses: number;
	home_num_otl: number;
	home_period1_goals: number;
	home_period2_goals: number;
	home_period3_goals: number;
	home_ot_goals: number;
	home_so_goals: number;
	home_score:	number;
	home_logo_link: string;

	away_team_id: number;
	away_team: string;
	away_num_wins: number;
	away_num_losses: number;
	away_num_otl: number;
	away_period1_goals: number;
	away_period2_goals: number;
	away_period3_goals: number;
	away_ot_goals: number;
	away_so_goals: number;
	away_score:	number;
	away_logo_link: string;


	time_remaining: string;
	date: string;


	started: boolean;
	overtime: boolean;
	shootout: boolean;
}