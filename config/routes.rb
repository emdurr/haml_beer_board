# == Route Map
#
#               Prefix Verb   URI Pattern                                               Controller#Action
#                 root GET    /                                                         boards#index
#     board_list_items GET    /boards/:board_id/lists/:list_id/items(.:format)          items#index
#                      POST   /boards/:board_id/lists/:list_id/items(.:format)          items#create
#  new_board_list_item GET    /boards/:board_id/lists/:list_id/items/new(.:format)      items#new
# edit_board_list_item GET    /boards/:board_id/lists/:list_id/items/:id/edit(.:format) items#edit
#      board_list_item GET    /boards/:board_id/lists/:list_id/items/:id(.:format)      items#show
#                      PATCH  /boards/:board_id/lists/:list_id/items/:id(.:format)      items#update
#                      PUT    /boards/:board_id/lists/:list_id/items/:id(.:format)      items#update
#                      DELETE /boards/:board_id/lists/:list_id/items/:id(.:format)      items#destroy
#          board_lists GET    /boards/:board_id/lists(.:format)                         lists#index
#                      POST   /boards/:board_id/lists(.:format)                         lists#create
#       new_board_list GET    /boards/:board_id/lists/new(.:format)                     lists#new
#      edit_board_list GET    /boards/:board_id/lists/:id/edit(.:format)                lists#edit
#           board_list GET    /boards/:board_id/lists/:id(.:format)                     lists#show
#                      PATCH  /boards/:board_id/lists/:id(.:format)                     lists#update
#                      PUT    /boards/:board_id/lists/:id(.:format)                     lists#update
#                      DELETE /boards/:board_id/lists/:id(.:format)                     lists#destroy
#               boards GET    /boards(.:format)                                         boards#index
#                      POST   /boards(.:format)                                         boards#create
#            new_board GET    /boards/new(.:format)                                     boards#new
#           edit_board GET    /boards/:id/edit(.:format)                                boards#edit
#                board GET    /boards/:id(.:format)                                     boards#show
#                      PATCH  /boards/:id(.:format)                                     boards#update
#                      PUT    /boards/:id(.:format)                                     boards#update
#                      DELETE /boards/:id(.:format)                                     boards#destroy
#

Rails.application.routes.draw do
  get 'items/index'

  get 'lists/index'

	root 'boards#index'
	
	resources :boards do
		resources :lists do
			resources :items
		end
	end
end
