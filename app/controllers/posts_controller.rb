class PostsController < ApplicationController

  rescue_from StandardError, :with => :unexpected_error
  rescue_from ActiveRecord::RecordInvalid, :with => :invalid_record

  respond_to :json

  def index
    posts = Post.limit(25).order('created_at desc')
    respond_with fix_for_dreamhost(posts)
  end

  def create
    Post.create!( :creator        => params[:creator], 
                  :state          => params[:state], 
                  :license_plate  => params[:license_plate], 
                  :comment        => params[:comment])
    render :json => {'success' => true}
  end

  def my
    user = params[:user]
    posts = Post.where(:creator => user)
    respond_with fix_for_dreamhost(posts)
  end

  private

  def invalid_record(error)
    Rails.logger.error("Error creating post: #{error.message}")
    render :json => error.message, :status => 400
  end

  def unexpected_error(error)
    Rails.logger.error("Error creating post: #{error.message}")
    Rails.logger.error(error.backtrace[0..15].join("\n"))
    render :json => 'Error', :status => 400
  end

  def fix_for_dreamhost(posts)
    posts.each do |post|
      post.created_at += 7.minutes
    end
  end
end
