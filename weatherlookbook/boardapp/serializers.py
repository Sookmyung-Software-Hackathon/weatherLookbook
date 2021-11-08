from rest_framework import serializers
from rest_framework.fields import ReadOnlyField
from .models import Board

class BoardSerializer(serializers.ModelSerializer):
    user = ReadOnlyField(source='user.username')
    class Meta:
        model = Board
        fields = ('bid', 'content', 'date', 'image', 'like', 'user', 'like_count')