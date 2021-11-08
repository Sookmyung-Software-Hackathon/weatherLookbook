from django.urls import path
from . import views

urlpatterns = [
    path("like/<int:board_bid>/", views.like_board, name="like_board"),
]