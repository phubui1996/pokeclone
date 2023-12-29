from django.db import models
from pokemon_app.models import Pokemon, UserPokemon
from user_app.models import User


# Create your models here.
class Team(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE, related_name='team')
    name = models.CharField(default="My Pokemon Team")
    pokemons = models.ManyToManyField(UserPokemon, through='TeamPokemon')

class TeamPokemon(models.Model):
  team = models.ForeignKey(Team, on_delete = models.CASCADE)
  user_pokemon = models.ForeignKey(Pokemon, on_delete = models.CASCADE, related_name = "team_pokemon")
  position = models.PositiveIntegerField()
  is_selected = models.BooleanField(default=True)