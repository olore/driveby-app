class AddStateToPosts < ActiveRecord::Migration
  def change
    change_table :posts do |t|
      t.string :state
    end
  end
end
