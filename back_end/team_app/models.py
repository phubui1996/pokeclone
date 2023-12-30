from django.db import models
from pokemon_app.models import Pokemon, UserPokemon
from user_app.models import User


# Create your models here.
class Team(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='team')
  name = models.CharField(default="My Pokemon Team", max_length=255)
  pokemons = models.ManyToManyField(UserPokemon, related_name='teams')

class TeamPokemon(models.Model):
  team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team_pokemons')
  user_pokemon = models.ForeignKey(UserPokemon, on_delete=models.CASCADE, related_name="team_pokemon")
  position = models.PositiveIntegerField(default=1)
  is_selected = models.BooleanField(default=True)

  class Meta:
    unique_together = ('team', 'user_pokemon')