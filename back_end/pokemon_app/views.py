from django.shortcuts import render, get_object_or_404
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
from .models import Pokemon
import requests

from user_app.views import UserPermissions
from .serializers import UserPokemon, UserPokemonSerializer, PokemonSerializer

# Create your views here.

class GetPokemon(APIView):
  def get(self, request, pokemon_id): #view a pokemon
    try:
      base_url = "https://pokeapi.co/api/v2/pokemon/"
      url = f"{base_url}{pokemon_id}/"

      response = requests.get(url)

      pokemon_data = response.json()

      pokemon, created = Pokemon.objects.get_or_create(
        name = pokemon_data["name"],
        type =  pokemon_data['types'][0]['type']['name'],
        move_1 = pokemon_data['moves'][0]['move']['name'],
        move_2 = pokemon_data['moves'][1]['move']['name'],
        front_img = pokemon_data['sprites']['front_shiny'],
        back_img = pokemon_data['sprites']['back_shiny'],
        pokemon_id = pokemon_data['id'],
        xp = 0,
        base_hp = pokemon_data["stats"][0]['base_stat'],
        hp = pokemon_data["stats"][0]['base_stat'],
        lvl = 1
      )

      formatted_data = {
        "id": pokemon.id,
        "name": pokemon.name,
        "type": pokemon.type,
        "move_1": pokemon.move_1,
        "move_2": pokemon.move_2,
        "front_img": pokemon.front_img,
        "back_img": pokemon.back_img,
        "pokemon_id": pokemon.pokemon_id,
        "xp": pokemon.xp,
        "base_hp": pokemon.base_hp,
        "hp": pokemon.hp,
        "lvl": pokemon.lvl
      }

      return Response(formatted_data)
  
    except Exception as e:
      print(e)
      return Response("Could not get the pokemon infomation", status = HTTP_404_NOT_FOUND)

class UserPokemonView(UserPermissions):
  def get(self, request): #view user's pokemon
    user = request.user
    user_pokemon = UserPokemon.objects.filter(user = user)
    user_pokemon_ser = UserPokemonSerializer(user_pokemon, many = True)

    # Extracting Pokemon instances from UserPokemon queryset
    pokemon_instances = [user_poke.pokemon for user_poke in user_pokemon]

    # Serializing Pokemon instances using PokemonSerializer
    pokemon_ser = PokemonSerializer(pokemon_instances, many=True)
  
    return Response(pokemon_ser.data)
    
  def post(self, request, id): #capture a pokemon
    user = request.user
    try:
      pokemon = Pokemon.objects.filter(id = id).first()

      user_pokemon_data = {'user': user.id, 'pokemon':{
        'id': pokemon.id, 
        'type': pokemon.type,
        'name': pokemon.name,
        'move_1': pokemon.move_1,
        'move_2': pokemon.move_2,
        'front_img': pokemon.front_img,
        'back_img': pokemon.back_img,
        'pokemon_id': pokemon.pokemon_id,
        'base_hp' : pokemon.base_hp,
        'hp': pokemon.hp,
        'xp': pokemon.xp,
        'lvl': pokemon.lvl
        }}
      
      serializer = UserPokemonSerializer(data=user_pokemon_data)

      if serializer.is_valid():
        serializer.save()
        return Response("Pokemon captured successfully!", status=HTTP_201_CREATED)
      else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    except Exception as e:
      print(e)
      return Response("couldn't capture the pokemon", status=HTTP_400_BAD_REQUEST)
    
  def put(self, request, id):
    try:
        pokemon = Pokemon.objects.get(id = id)

        # Update Pokemon attributes based on the request data
        pokemon.name = request.data.get("name")
        pokemon.type = request.data.get("type")
        pokemon.move_1 = request.data.get("move_1")
        pokemon.move_2 = request.data.get("move_2")
        pokemon.front_img = request.data.get("front_img")
        pokemon.back_img = request.data.get("back_img")
        pokemon.pokemon_id = request.data.get("pokemon_id")
        pokemon.base_hp = request.data.get("base_hp")
        pokemon.hp = request.data.get("hp")
        pokemon.xp = request.data.get("xp")
        pokemon.lvl = request.data.get("lvl")

        # Save the updated Pokemon instance
        pokemon.save()
        
        # Serialize the updated Pokemon instance
        pokemon_ser = PokemonSerializer(pokemon)
        
        return Response("Pokemon updated successfully")
    
    except Exception as e:
        print(e)
        return Response("Could not update pokemon", status = HTTP_400_BAD_REQUEST)
  
  def delete(self, request, id):
    user = request.user 
    try: 
      user_pokemon = UserPokemon.objects.filter(pokemon_id = id, user = user)
      user_pokemon.delete()
      return Response("Pokemon released successfully", status = HTTP_204_NO_CONTENT)
    
    except Exception as e:
      print(e)
      return Response("Pokemon not found in User's pokemon list", status = HTTP_404_NOT_FOUND)
      
class Pokedex(APIView):
  def get(self, request):
    pokemons = Pokemon.objects.all()
    pokemons_ser = PokemonSerializer(pokemons,many = True)
    return Response(pokemons_ser.data)

  def delete(self, request):
    pokemons = Pokemon.objects.all()
    pokemons.delete()
    return Response("Pokedex reset", status = HTTP_204_NO_CONTENT)