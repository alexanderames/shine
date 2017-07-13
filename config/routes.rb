Rails.application.routes.draw do
	
	resources :customers, only: [ :index, :show ]

  devise_for :users

  get "angular_test", to: "angular_test#index"

  get "fake_billing", to: "fake_billing#show"

	root 'dashboard#index'

end