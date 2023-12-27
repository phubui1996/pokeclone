from django.db import models
from user_app.models import User
from pokemon_app.models import Pokemon

# Create your models here.
class Team(models.Model):
  # name = models.CharField(max_length=15)
  # type = models.CharField(max_length=15)
  # move_1 = models.CharField(max_length=15)
  # move_2 = models.CharField(max_length=15)
  # front_img = models.CharField(max_length=100)
  # back_img = models.CharField(max_length=100)
  # hp = models.IntegerField(default = 10)
  # xp = models.IntegerField(default = 0)
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='team')

class Team_pokemon(models.Model):
  team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team_pokemon')
  pokemon = models.ForeignKey(Pokemon, on_delete=models.CASCADE)