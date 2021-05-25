require 'rails_helper'

RSpec.describe Pick, :type => :model do
  it "is not valid without attributes" do
    expect(Pick.new).to_not be_valid
  end

  it "is valid with attributes" do
    pick = Pick.new(
        game_id: 10,
        user_email: 'nico@aol.com',
        home_or_away: 'Home',
        summary: 'Braves vs Tigers',
        league: 'MLB',
        home_odds: -1.5,
        away_odds: 1.5
    )
    expect(pick).to be_valid
  end
end