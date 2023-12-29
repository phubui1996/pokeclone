from .models import Team, TeamPokemon
from rest_framework.serializers import ModelSerializer


class TeamSerializer(ModelSerializer):
  class Meta:
    model = Team
    fields = "__all__"

class TeamPokemonSerializer(ModelSerializer):
  class Meta:
    model = TeamPokemon
    fields = "__all__"