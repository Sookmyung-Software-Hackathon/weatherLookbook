from .models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create_user(
            email = validated_data['email'],
            username = validated_data['username'],
            password = validated_data['password'],
        )
        #user.set_password(validated_data['password'])
        return user
    class Meta :
        model = User
        fields = ['email', 'username', 'password']

