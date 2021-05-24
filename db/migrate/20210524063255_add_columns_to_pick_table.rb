class AddColumnsToPickTable < ActiveRecord::Migration[6.1]
  def change
    add_column :picks, :summary, :string
    add_column :picks, :league, :string
    add_column :picks, :home_odds, :string
    add_column :picks, :away_odds, :string
  end
end
