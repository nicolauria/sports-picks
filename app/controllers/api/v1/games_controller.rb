class Api::V1::GamesController < ApplicationController
    require 'uri'
    require 'net/http'
    require 'openssl'
    
    def games
        url = URI("https://sportspage-feeds.p.rapidapi.com/games")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE

        request = Net::HTTP::Get.new(url)
        request["x-rapidapi-key"] = '9a4d099c92msh2a1c415f181c7a5p1dafe6jsn3a30d68ca532'
        request["x-rapidapi-host"] = 'sportspage-feeds.p.rapidapi.com'

        response = http.request(request)
        games = response.read_body
        render json: JSON.parse(games)
    end

    def game
        url = URI("https://sportspage-feeds.p.rapidapi.com/gameById?gameId=#{params[:id]}")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE

        request = Net::HTTP::Get.new(url)
        request["x-rapidapi-key"] = '9a4d099c92msh2a1c415f181c7a5p1dafe6jsn3a30d68ca532'
        request["x-rapidapi-host"] = 'sportspage-feeds.p.rapidapi.com'

        response = http.request(request)
        game = response.read_body
        render json: JSON.parse(game)
    end
end
