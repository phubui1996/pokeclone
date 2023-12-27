from django.db import models

# Create your models here.
class GameMap(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

class Location(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    x_coordinate = models.IntegerField()
    y_coordinate = models.IntegerField()
    map = models.ForeignKey(GameMap, on_delete=models.CASCADE, related_name='locations')