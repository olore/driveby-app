require File.dirname(__FILE__) + '/../test_helper'

class PostTest < ActiveSupport::TestCase

  test "creating a post" do
    assert_difference "Post.count" do
      Post.create!( :license_plate => 'foofoo',
                    :comment => 'you rock',
                    :state   => 'CT',
                    :creator => 'bobdobalina')
    end
  end

  test "creating a post requires license plate" do
    assert_no_difference 'Post.count' do
      Post.create(  :comment => 'you rock',
                    :creator => 'bobdobalina')
    end
  end

  test "creating a post requires comment" do
    assert_no_difference 'Post.count' do
      Post.create(  :license_plate => 'foofoo',
                    :creator => 'bobdobalina')
    end
  end

  test "creating a post requires creator" do
    assert_no_difference 'Post.count' do
      Post.create(  :license_plate => 'foofoo',
                    :comment => 'you rock')
    end
  end

  test "plates only contain alpha numerics" do
    hash = { :comment => 'you rock',
             :state   => 'CT',
             :creator => 'bobdobalina'}

    bad_plates = %w( abc!23 123_fff rr#rr )

    bad_plates.each do |bad_plate|
      assert_no_difference 'Post.count' do
        Post.create( hash.merge(:license_plate => bad_plate))
      end
    end
  end

end
