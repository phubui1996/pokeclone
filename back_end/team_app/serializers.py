from .models import Team
from rest_framework.serializers import ModelSerializer
class TeamSerializer(ModelSerializer):
  class Meta:
    model = Team
    fields = ["id", "name", "type", "move_1", "move_2", "front_img", "back_img", "hp", "xp"]