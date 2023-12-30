from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
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
from .models import User
from team_app.models import Team

# Create your views here.

class Sign_up(APIView):
  def post(self, request):
    data = request.data 
    data['username'] = request.data.get('email')
    new_user = User.objects.create_user(**data)
    new_team = Team.objects.create(user=new_user)

    if new_user is not None: 
      new_token = Token.objects.create(user = new_user)
      login(request, new_user)
      return Response({
        "User": new_user.user_name,
        "Token": new_token.key,
        "TeamID": new_team.id
      }, status = HTTP_201_CREATED)
    
    return Response("Something went wrong with sign up", status=HTTP_400_BAD_REQUEST)
  
class Log_in(APIView):
  def post(self, request):
    data = request.data.copy()
    user = authenticate(username = data.get('email'), password = data.get('password'))

    if user is not None:
      token, created = Token.objects.get_or_create(user = user)
      login(request, user)
      return Response({
        "User": user.user_name,
        "Token": token.key
      })
    
    return Response("Failed to log in", status=HTTP_400_BAD_REQUEST)

class UserPermissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Info(UserPermissions):
  def get(self, request):
    return Response({"user": request.user.user_name})

class Log_out(UserPermissions):
  def post(self, request):
    request.user.auth_token.delete()
    return Response('User logged out', status=HTTP_204_NO_CONTENT)