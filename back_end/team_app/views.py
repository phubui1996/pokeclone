from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND
)
from .serializers import Team, TeamSerializer
from user_app.views import UserPermissions

# Create your views here.
class team(UserPermissions):
  def get(self, request):
    user = request.user 
    try:
      team = Team.objects.filter(user = user)
      team_ser = TeamSerializer(team, many = True)

      return Response(team_ser.data)
    
    except Exception as e:
      print(e)
      return Response("Fail to get user's pokemon", status = HTTP_404_NOT_FOUND)
    
  def post(self, request):
    user = request.user
    try:
      team, created = Team.objects.get_or_create(user=user, defaults={'name': 'Default Name'})

      team.name = request.data.get("name")
      team.type = request.data.get("type")
      team.move_1 = request.data.get("move_1")
      team.move_2 = request.data.get("move_2")
      team.front_img = request.data.get("front_img")
      team.back_img = request.data.get("back_img")
      
      team.save()
      team_ser = TeamSerializer(team)
      return Response("Pokemon save to team")

    except Exception as e:
        print(e)
        return Response("Could not save pokemon to team", status=HTTP_400_BAD_REQUEST)
    
  def put(self, request):
    user = request.user
    try:
      team = Team.objects.get(user = user)

      team.name = request.data.get("name")
      team.type = request.data.get("type")
      team.move_1 = request.data.get("move_1")
      team.move_2 = request.data.get("move_2")
      team.front_img = request.data.get("front_img")
      team.back_img = request.data.get("back_img")

      team.save()
      team_ser = TeamSerializer(team)

      return Response("Pokemon updated in team")
    
    except Exception as e:
      print(e)
      return Response("Could not update pokemon", status=HTTP_400_BAD_REQUEST)
    
  def delete(self, request, pokemon_name):
    user = request.user
    try: 
      team = Team.objects.get(user = user, name = pokemon_name)
      team.delete()

      return Response("Successfully delete a pokemon", status = HTTP_204_NO_CONTENT)
    
    except Exception as e:
      print(e)
      return Response("Could not delete pokemon", status=HTTP_400_BAD_REQUEST)