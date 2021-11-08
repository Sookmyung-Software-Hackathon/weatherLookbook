from django.db import models
from accountapp.models import User

# Create your models here.
class Board(models.Model):
    bid = models.AutoField(primary_key=True)
    content = models.TextField(null=True)
    date = models.DateField(auto_now_add=True)
    image = models.ImageField(upload_to='Image/Board/', null=True)
    
    like = models.ManyToManyField(User, related_name='likes',blank=True)
    like_count = models.PositiveIntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
