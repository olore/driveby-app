class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :license_plate
      t.string :comment
      t.string :creator

      t.timestamps
    end
  end
end
