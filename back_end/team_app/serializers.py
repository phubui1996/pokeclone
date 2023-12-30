from rest_framework.serializers import ModelSerializer
from .models import Team, TeamPokemon


class TeamSerializer(ModelSerializer):
  class Meta:
    model = Team
    fields = "__all__"

class TeamPokemonSerializer(ModelSerializer):
  class Meta:
    model = TeamPokemon
    fields = "__all__"