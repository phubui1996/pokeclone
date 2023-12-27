from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from .models import Pokemon
import requests

# Create your views here.

class GetPokemon(APIView):
  def get(self, request, pokemon_name):
    try:
      base_url = "https://pokeapi.co/api/v2/pokemon/"
      url = f"{base_url}{pokemon_name}/"

      response = requests.get(url)

      pokemon_data = response.json()

      pokemon, created = Pokemon.objects.get_or_create(
        name = pokemon_data["name"],
        type =  pokemon_data['types'][0]['type']['name'],
        move_1 = pokemon_data['moves'][0]['move']['name'],
        move_2 = pokemon_data['moves'][1]['move']['name'],
        front_img = pokemon_data['sprites']['back_shiny'],
        back_img = pokemon_data['sprites']['front_shiny'],
        xp = 0,
        hp = 10
      )

      formatted_data = {
        "id": pokemon.id,
        "name": pokemon.name,
        "type": pokemon.type,
        "move_1": pokemon.move_1,
        "move_2": pokemon.move_2,
        "front_img": pokemon.front_img,
        "back_img": pokemon.back_img,
        "xp": pokemon.xp,
        "hp": pokemon.hp,
      }

      return Response(formatted_data)
  
    except Exception as e:
      print(e)
      return Response("Could not get the pokemon infomation", status = HTTP_404_NOT_FOUND)