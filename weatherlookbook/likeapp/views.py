from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
from boardapp.models import Board
from accountapp.models import User
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
# Create your views here.

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
@csrf_exempt 
def like_board(request, board_bid):
    board = get_object_or_404(Board, bid=board_bid)
    print(board)
    print(request.user)
    if request.user in board.like.all():
        board.like.remove(request.user)
        board.like_count -= 1
        board.save()
    else:
        board.like.add(request.user)
        board.like_count += 1
        board.save()
    return JsonResponse({"msg":"good"}) 