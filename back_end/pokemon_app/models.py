from django.db import models

# Create your models here.

class Pokemon(models.Model):
  name = models.CharField(max_length=15)
  type = models.CharField(max_length=15)
  move_1 = models.CharField(max_length=15)
  move_2 = models.CharField(max_length=15)
  front_img = models.URLField()
  back_img = models.URLField()
  hp = models.IntegerField(default = 10)
  xp = models.IntegerField(default = 0)