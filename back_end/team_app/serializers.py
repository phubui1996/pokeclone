from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Team, TeamPokemon
from pokemon_app.serializers import UserPokemonSerializer

class TeamSerializer(ModelSerializer):
  user = serializers.PrimaryKeyRelatedField(read_only=True)
  pokemons = serializers.SerializerMethodField()

  class Meta:
    model = Team
    fields = ['id', 'name', 'user', 'pokemons']

  def get_pokemons(self, team):
    team_pokemons = TeamPokemon.objects.filter(team=team)
    return TeamPokemonSerializer(team_pokemons, many=True).data

class TeamPokemonSerializer(ModelSerializer):
  # team = TeamSerializer()
  user_pokemon = UserPokemonSerializer()

  class Meta:
    model = TeamPokemon
    fields = "__all__"