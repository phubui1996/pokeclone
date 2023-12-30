from .models import UserPokemon, Pokemon
from rest_framework.serializers import ModelSerializer


class PokemonSerializer(ModelSerializer):
  class Meta:
    model = Pokemon
    fields = "__all__"
    
class UserPokemonSerializer(ModelSerializer):
  pokemon = PokemonSerializer()

  class Meta:
    model = UserPokemon
    fields = ['pokemon']