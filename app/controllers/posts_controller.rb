class PostsController < ApplicationController

  def index
    posts = Post.limit(25).order('created_at asc')
    render :json => posts
  end

  def create
    Post.create!(:creator        => params[:creator], 
                :license_plate  => params[:license_plate], 
                :comment        => params[:comment])
    render :json => {'success' => true}

  rescue => e
    Rails.logger.error("Error creating post: #{e.message}")
    Rails.logger.error(e.backtrace[0..15].join("\n"))
    render :json => 'Error', :status => 400
  end

end
