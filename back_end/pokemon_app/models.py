from django.db import models
from user_app.models import User
# Create your models here.

class Pokemon(models.Model):
  name = models.CharField(max_length=15)
  type = models.CharField(max_length=15)
  move_1 = models.CharField(max_length=15)
  move_2 = models.CharField(max_length=15)
  front_img = models.URLField()
  back_img = models.URLField()
  pokemon_id = models.IntegerField()
  hp = models.IntegerField(default = 10)
  xp = models.IntegerField(default = 0)
  lvl = models.IntegerField(default = 1)

class UserPokemon(models.Model):
  user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "captured_pokemon")
  pokemon = models.ForeignKey(Pokemon, on_delete = models.CASCADE, related_name='captured_pokemon')