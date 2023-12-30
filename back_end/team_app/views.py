from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from pokemon_app.models import Pokemon
import requests
from django.shortcuts import get_object_or_404
from user_app.views import UserPermissions
from .models import Team, TeamPokemon
from pokemon_app.models import UserPokemon
from .serializers import TeamPokemonSerializer, TeamSerializer

# Create your views here.
class TeamManager(UserPermissions):
  template_name = 'team_pokemon.html'

  def get(self, request):     #get user's pokemon team(6)
    user_teams = Team.objects.filter(user = request.user)
    user_teams_ser = TeamSerializer(user_teams, many = True)
    return Response(user_teams.data)

 
  def post(self, request, team_id):       #add pokemon to user's team

    team = get_object_or_404(Team, id = team_id, user = request.user)
    team_pokemons = TeamPokemon.objects.filter(team = team)

    if request.method == 'POST':

      action = request.POST.get('action')
      pokemon_ids = request.POST.getlist('pokemon_id')

      if action == 'pick':          # Add selected Pokemon to the team
        # Clear existing team for simplicity, adjust as needed
        team_pokemons.delete()

        for pokemon_id in pokemon_ids:
          user_pokemon = get_object_or_404(UserPokemon, id=pokemon_id, user = request.user)
          position = TeamPokemon.objects.filter(team = team).count() + 1
          TeamPokemon.objects.create(team = team, user_pokemon = user_pokemon, position=position)
        return Response("Pokemon added to user's team", status = HTTP_201_CREATED)

      elif action == 'unpick':      # Unpick the selected Pokemon from the team
          
        for pokemon_id in pokemon_ids:
          user_pokemon = get_object_or_404(UserPokemon, id=pokemon_id, user = request.user)
          team_pokemon = TeamPokemon.objects.get(team = team, user_pokemon = user_pokemon)
          team_pokemon.delete()
        return Response("Pokemon removed from user's team", status = HTTP_201_CREATED)
        
    return Response("Invalid request", status = HTTP_400_BAD_REQUEST)