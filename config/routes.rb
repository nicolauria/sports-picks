Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'signup', to: 'users#create'
      post 'login', to: 'users#signin'
      get 'games', to: 'games#index'
      get 'game/:id', to: 'games#show'
      get 'picks', to: 'picks#index'
      post 'picks', to: 'picks#create'
      patch 'pick', to: 'picks#update'
    end
  end
  
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
