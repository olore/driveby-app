class Post < ActiveRecord::Base
  validates :license_plate, :comment, :creator,
              :presence => true
end
