from .views import GetPokemon, UserPokemonView, Pokedex
from django.urls import path

urlpatterns = [ #change str to int
  path('wild/<int:pokemon_id>/', GetPokemon.as_view(), name='all_pokemon'),

  path('', UserPokemonView.as_view(), name='user_pokemon'),
  path('<int:id>/', UserPokemonView.as_view(), name='user_pokemon'),

  path('pokedex/', Pokedex.as_view(), name='pokedex'),
]