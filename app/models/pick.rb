class Pick < ApplicationRecord
    validates :game_id, presence: true
    validates :user_email, presence: true
    validates :home_or_away, presence: true
    validates :summary, presence: true
    validates :league, presence: true
    validates :home_odds, presence: true
    validates :away_odds, presence: true
end
