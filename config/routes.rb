Rails.application.routes.draw do
     
  
  root 'home#index'
  devise_for :users, controllers: {registrations: "registrations", omniauth_callbacks: "omniauth_callbacks"}

  
  resources :users, only: [:index, :show, :edit, :update]

  get 'auth/:provider/callback', to: "sessions#create"
  
  get 'users/:id' => 'users#show'
  get '/address_book' => 'pages#address_book', as: :address_book
  get '/calendar' => 'pages#calendar', as: :calendar
  get '/dashboard' => 'pages#dashboard', as: :dashboard
  get '/fileupload' => 'pages#fileupload', as: :fileupload
  get '/sign_in' => 'pages#sign_in', as: :sign_in
     
  delete 'sign_out', to: "sessions#destroy", as: 'sign_out'

end