from .views import team
from django.urls import path

urlpatterns = [
  path('', team.as_view(), name='team'),
  path('<str:pokemon_name>/', team.as_view(), name='team'),
]