from django.db import models
from user_app.models import User
from pokemon_app.models import Pokemon

# Create your models here.
class Team(models.Model):
  name = models.CharField(max_length = 20)
  trainer = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "teams")
  location = models.CharField(max_length = 50)
  created_at = models.DateTimeField(auto_now_add = True)
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='team')

class Team_pokemon(models.Model):
  team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team_pokemon')
  pokemon = models.ForeignKey(Pokemon, on_delete=models.CASCADE)