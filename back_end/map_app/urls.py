from .views import display_map
from django.urls import path

urlpatterns = [
  path('', display_map.as_view(), name='display_map'),
]