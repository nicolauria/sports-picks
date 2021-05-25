require 'rails_helper'

RSpec.describe "API V1 Users", type: 'request' do
    describe "POST /api/v1/signup" do
        context "with valid parameters" do
            let(:valid_params) do
                { email: 'nico@aol.com', password: 'secret'}
            end
    
            it "creates a new user" do
                expect { post "/api/v1/signup", params: valid_params }.to change(User, :count).by(+1)
                expect(response).to have_http_status 200
            end
    
            it "creates a user with the correct attributes" do
                post "/api/v1/signup", params: valid_params
                expect(User.last).to have_attributes email: 'nico@aol.com'
            end
        end
    end
end