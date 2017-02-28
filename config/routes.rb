Rails.application.routes.draw do
	resources :customers, only: [ :index ]

  devise_for :users

  get "angular_test", to: "angular_test#index"

	root 'dashboard#index'

end