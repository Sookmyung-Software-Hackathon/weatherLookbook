from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import viewsets
from .serializers import BoardSerializer 
from .models import Board
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated


class BoardViewSet(viewsets.ModelViewSet): 
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    filter_backends = [SearchFilter]
    search_fields = ['content', 'date']
