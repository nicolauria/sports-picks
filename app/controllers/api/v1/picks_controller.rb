class Api::V1::PicksController < ApplicationController
    def create
        pick = Pick.new(pick_params)
        if pick.save
            render json: pick
        else
            render json: pick.errors.full_messages, status: 422
        end
    end

    def index
        @picks = Pick.where(user_email: current_user.email)
        render json: @picks
    end

    def update
        pick = Pick.find(params[:id])
        home = params[:home_final] + pick.home_odds
        away = params[:away_final] + pick.away_odds

        if home > away
            winner = "Home"
        else
            winner = "Away"
        end
        
        pick = pick.update(
            winning_team: winner, 
            home_final: params[:home_final],
            away_final: params[:away_final] 
        )

        render json: pick
    end

    private

    def pick_params
        params.permit(:user_email, :game_id, :home_or_away, :summary, :league, :home_odds, :away_odds, :home_final, :away_final)
    end
end
