from .models import UserPokemon, Pokemon
from rest_framework.serializers import ModelSerializer

class UserPokemonSerializer(ModelSerializer):
  class Meta:
    model = UserPokemon
    fields = "__all__"

class PokemonSerializer(ModelSerializer):
  class Meta:
    model = Pokemon
    fields = "__all__"
