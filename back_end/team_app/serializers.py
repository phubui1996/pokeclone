from rest_framework.serializers import ModelSerializer
from .models import Team, TeamPokemon
from pokemon_app.serializers import UserPokemonSerializer

class TeamSerializer(ModelSerializer):
  class Meta:
    model = Team
    fields = "__all__"

class TeamPokemonSerializer(ModelSerializer):
  team = TeamSerializer()
  user_pokemon = UserPokemonSerializer()

  class Meta:
    model = TeamPokemon
    fields = "__all__"
