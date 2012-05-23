class Post < ActiveRecord::Base
  validates :license_plate, :comment, :creator, :state,
              :presence => true
  validates :license_plate, :format => { :with => /\A[a-zA-Z0-9]*\Z/ }

end
