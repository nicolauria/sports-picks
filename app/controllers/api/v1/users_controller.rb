class Api::V1::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            login(@user)
            render json: @user
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def signin
        @user = User.find_by_credentials(
            params[:email],
            params[:password]
        )
        
        if @user
            login(@user)
            render json: @user
        else
            render json: ["Invalid username/password combination"], status: 401
        end
    end

    private

    def user_params
        params.permit(:email, :password)
    end
end
