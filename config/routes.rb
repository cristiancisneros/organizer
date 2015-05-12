Rails.application.routes.draw do
     
  
  root 'home#index'
  devise_for :users
  
  
  get '/address_book' => 'pages#address_book', as: :address_book
  get '/calendar' => 'pages#calendar', as: :calendar
     
  
end