class CreatePicks < ActiveRecord::Migration[6.1]
  def change
    create_table :picks do |t|
      t.string :user_email
      t.integer :game_id
      t.string :home_or_away
      t.string :result

      t.timestamps
    end
  end
end
