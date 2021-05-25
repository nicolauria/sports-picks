require 'rails_helper'

RSpec.describe User, :type => :model do
  it "is not valid without attributes" do
    expect(User.new).to_not be_valid
  end

  it "is valid with attributes" do
    user = User.new(
        email: 'nico@aol.com',
        password: 'secret',
        password_digest: 'asdofijawefjioasdfkjle',
        session_token: '18hsdh988w9ehslkad90'
    )
    expect(user).to be_valid
  end
end