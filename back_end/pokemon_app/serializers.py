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
    fields = ['user', 'pokemon']
    # fields = '__all__'

  def create(self, validated_data):
    # Extract the nested Pokemon data from the validated data
    pokemon_data = validated_data.pop('pokemon')
    
    # Get or create the Pokemon instance based on its ID
    pokemon_instance, created = Pokemon.objects.get_or_create(**pokemon_data)
    
    # Create the UserPokemon instance
    user_pokemon = UserPokemon.objects.create(pokemon=pokemon_instance, **validated_data)
    return user_pokemon