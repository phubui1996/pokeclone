from django.urls import path
from .views import TeamManager

urlpatterns = [
    path('manager/', TeamManager.as_view(), name='get_user_teams_api'),
]