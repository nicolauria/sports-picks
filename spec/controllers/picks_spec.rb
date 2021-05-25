require 'rails_helper'

RSpec.describe "API V1 Picks", type: 'request' do
    describe "POST /api/v1/picks" do
        context "with valid parameters" do
            let(:valid_params) do
                { 
                    game_id: 10,
                    user_email: 'nico@aol.com', 
                    home_or_away: 'Home',
                    summary: 'Braves vs Tigers',
                    league: 'MLB',
                    home_odds: -1.5,
                    away_odds: 1.5
                }
            end
    
            it "creates a new pick" do
                expect { post "/api/v1/picks", params: valid_params }.to change(Pick, :count).by(+1)
                expect(response).to have_http_status 200
            end
    
            it "creates a pick with the correct attributes" do
                post "/api/v1/picks", params: valid_params
                expect(Pick.last).to have_attributes user_email: 'nico@aol.com'
            end
        end
    end
end