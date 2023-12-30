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
from pokemon_app.models import UserPokemon
from pokemon_app.serializers import UserPokemonSerializer
from .models import Team, TeamPokemon
from .serializers import TeamSerializer, TeamPokemonSerializer

# Create your views here.
class TeamManager(UserPermissions):

  def get(self, request):  
    user_teams = Team.objects.filter(user = request.user)
    user_teams_data = []
    
    for team in user_teams:
      team_data = TeamSerializer(team).data
      team_data['pokemons'] = TeamPokemonSerializer(team.team_pokemons.all(), many=True).data
      user_teams_data.append(team_data)

    return Response(user_teams_data)

  def post(self, request, team_id):  
    team = get_object_or_404(Team, id = team_id, user = request.user)
    action = self.request.data.get('action')
    pokemon_ids = self.request.data.get('pokemon_ids', [])

    try:
      if action == 'pick': 

        # Clear existing team for simplicity.
        team_pokemons = TeamPokemon.objects.filter(team = team)
        team_pokemons.delete()

        for pokemon_id in pokemon_ids:
          user_pokemon = get_object_or_404(UserPokemon, pokemon_id=pokemon_id, user = request.user)
          position = TeamPokemon.objects.filter(team = team).count() + 1
          TeamPokemon.objects.create(team = team, user_pokemon = user_pokemon, position=position)
        return Response("Pokemon added to user's team")

      elif action == 'unpick':   
        for pokemon_id in pokemon_ids:
          user_pokemon = get_object_or_404(UserPokemon, pokemon_id=pokemon_id, user = request.user)
          team_pokemon = TeamPokemon.objects.get(team = team, user_pokemon = user_pokemon)
          team_pokemon.delete()
        return Response("Pokemon removed from user's team")
        
    except Exception as e:
      return Response(f"Error: {str(e)}", status=HTTP_400_BAD_REQUEST)
    
    return Response("Invalid request", status = HTTP_400_BAD_REQUEST)
    