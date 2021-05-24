class AddScoresToPicks < ActiveRecord::Migration[6.1]
  def change
    add_column :picks, :winning_team, :string
    add_column :picks, :home_final, :integer
    add_column :picks, :away_final, :integer
    change_column :picks, :home_odds, :integer, using: 'home_odds::integer'
    change_column :picks, :away_odds, :integer, using: 'away_odds::integer'
  end
end
