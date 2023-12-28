from .views import GetPokemon, UserPokemonView
from django.urls import path

urlpatterns = [ #change str to int
  path('wild/<str:pokemon_name>/', GetPokemon.as_view(), name='all_pokemon'),
  path('', UserPokemonView.as_view(), name='user_pokemon'),
  path('<str:user_pokemon_name>/', UserPokemonView.as_view(), name='user_pokemon'),
]