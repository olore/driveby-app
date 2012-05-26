#Fix for rails-3.2.1 writing to production log - https://github.com/rails/rails/issues/4277#issuecomment-3999463
Rails.logger.instance_variable_get(:@logger).instance_variable_get(:@log_dest).sync = true if Rails.logger
