Rails.application.routes.draw do
     
  
  root 'home#index'
  devise_for :users
  
  resources :users, only: [:index, :show, :edit, :update]
  
  get '/address_book' => 'pages#address_book', as: :address_book
  get '/calendar' => 'pages#calendar', as: :calendar
  get '/dashboard' => 'pages#dashboard', as: :dashboard
  get '/sign_in' => 'pages#sign_in', as: :sign_in
     
  
end