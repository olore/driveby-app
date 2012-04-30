class Post < ActiveRecord::Base
  validates :license_plate, :comment, :creator, :state,
              :presence => true
end
