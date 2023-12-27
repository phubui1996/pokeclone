from .views import GetPokemon
from django.urls import path

urlpatterns = [
  path('<str:pokemon_name>/', GetPokemon.as_view(), name='all_pokemon'),
]