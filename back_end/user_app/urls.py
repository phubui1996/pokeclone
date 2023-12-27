from .views import Sign_up, Log_in, Log_out, Info
from django.urls import path

urlpatterns = [
  path('', Info.as_view(), name='info'),
  path('signup/', Sign_up.as_view(), name='sign_up'),
  path('login/', Log_in.as_view(), name='log_in'),
  path('logout/', Log_out.as_view(), name='log_out'),
]