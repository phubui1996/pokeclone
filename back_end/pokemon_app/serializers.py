from .models import UserPokemon, Pokemon
from rest_framework.serializers import ModelSerializer

class UserPokemonSerializer(ModelSerializer):
  # user_pokemons = PokemonSerializer(many=True, read_only=True)
  class Meta:
    model = UserPokemon
    fields = "__all__"

class PokemonSerializer(ModelSerializer):
  # user_pokemons = UserPokemonSerializer(many=True, read_only=True)
  class Meta:
    model = Pokemon
    fields = "__all__"