from .views import get_pokemon
from django.urls import path

urlpatterns = [
  path('<str:pokemon_name>/', get_pokemon.as_view(), name='all_pokemon'),
]