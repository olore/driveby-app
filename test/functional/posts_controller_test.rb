require File.dirname(__FILE__) + '/../test_helper'

class PostsControllerTest < ActionController::TestCase

  test "route for posts" do
    assert_routing({:path => "posts", :method => :get}, 
                  {:controller => "posts", :action => "index"})
  end
 
  test "route for create post" do
    assert_routing({:path => "posts", :method => :post}, 
                  {:controller => "posts", :action => "create"})
  end

  test "route for DELETE doesnt work" do
    assert_raises ActionController::RoutingError do
      assert_routing({:path => "posts/1", :method => :delete}, 
                    {:controller => "posts", :id => '1', :action => "destroy"})
    end
  end

  test "route for UPDATE doesnt work" do
    assert_raises ActionController::RoutingError do
      assert_routing({:path => "posts/1", :method => :put}, 
                    {:controller => "posts", :id => '1', :action => "update"})
    end
  end

  test "route for getting posts made by a user" do
    assert_routing({:path => "posts/my/user", :method => :get}, 
                  {:controller => "posts", :action => "my", :user => 'user'})
  end
  test "creating a new post calls Post#create" do
    params = {:creator => 'bob', :state => 'NY', :license_plate => '123abc', :comment => 'woo woo'}
    Post.expects(:create!).with(params)
    post 'create', params.merge(:format => :json)
    assert_response :success
  end

  test "creating a new post responds with json success message" do
    params = {:creator => 'bob', :state => 'NY', :license_plate => '123abc', :comment => 'woo woo'}
    post 'create', params.merge(:format => :json)
    assert_response :success
    assert_match 'application/json', @response.header['Content-Type']
    resp = JSON.parse(@response.body)
    assert_match 'true', resp['success'].to_s
  end

  test "index returns json content type" do
    get 'index', :format => :json
    assert_response :success
    assert_match 'application/json', @response.header['Content-Type']
  end

  test "index returns posts in json" do
    post1 = Post.create!(:creator => 'bob', :state => 'NY', :license_plate => '123abc', :comment => 'woo woo')
    post2 = posts(:two)
    Post.expects(:limit).returns(mock(:order => [post1, post2]))
    get 'index', :format => :json
    posts = JSON.parse(@response.body)
    assert_equal 2, posts.count
    assert_equal post1.comment, posts[0]['comment']
    assert_equal post1.creator, posts[0]['creator']
    assert_equal post2.license_plate, posts[1]['license_plate']
  end

  test "create failure results in 400 and logs" do
    Rails.logger.expects(:error).at_least(1)
    post 'create', {:license_plate => 'abc123', :format => :json}
    assert_response 400
  end

  test "bad plate results in proper error message" do
    bad_plate = 'abc!!23'
    post 'create', { :creator        => 'foo',
                     :comment        => 'bar',
                     :state          => 'NY',
                     :license_plate  => bad_plate}
    assert_response 400
    assert_match /license plate is invalid/i, @response.body
  end

  test "fix for dreamhost server being off by 7 minutes" do
    post = Post.first
    get 'index', :format => :json
    posts = JSON.parse(@response.body)
    assert_equal post.created_at + 7.minutes, posts.first['created_at']
  end

  test "get posts ive created" do
    post = Post.first
    post.dup.save!
    me = post.creator

    get "my", :user => me, :format => :json
    posts = JSON.parse(@response.body)
    assert_equal 2, posts.size
  end

end
