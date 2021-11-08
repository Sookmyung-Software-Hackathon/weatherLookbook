from django.http.response import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
#from rest_framework_jwt.authentication import JSONWebTokenAuthentication
#from rest_framework_jwt.views import ObtainJSONWebToken
#from rest_framework_jwt.views import obtain_jwt_token

from .models import User
from boardapp.models import Board
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

@api_view(['POST'])
@permission_classes((AllowAny, ))
def join(request):
    try :
        user = User.objects.create_user(username=request.data.get("username"), password=request.data.get("password"), email = request.data.get("email"))
        print(user)
        user.save()
        token = Token.objects.create(user=user)
    except :
        try :
            user = User.objects.get(username = request.data.get('username'))
            print("Already User")
            token = Token.objects.get(user=user)
        except :
            return Response({'msg':'Please check the Personal InFo'})
    
    return Response({"Token":token.key})


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def edit_username(request):
    user = User.objects.get(username = request.user.username)
    user.username = request.data.get("newname")
    #user.username = request.POST['newname']
    user.save()
    context = {'msg':'Username Changed Success'}
    return JsonResponse(context)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def edit_profile(request):
    print(request.user.username)
    user = User.objects.get(username = request.user.username)
    user.profile_image = request.FILES['newimage']
    user.save()
    context = {'msg':'User Profile Image Changed Success'}
    return JsonResponse(context)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def myboard(request):
    print(request.user.uid)
    board = Board.objects.filter(user_id = request.user.uid)
    print(board)
    l = []
    for b in board:
        print(b.bid)
        print(b.image)
        
        context = {
            "bid":b.bid,
            "image":str(b.image)
        }
        l.append(context)

    print(l)
    
    return JsonResponse(l, safe=False)


@api_view(['POST'])
@csrf_exempt
@permission_classes((IsAuthenticated, ))
def deleteaccount(request):
    user = User.objects.get(username=request.user)
    user.delete()
    
    context = {'msg':str(user)+' Delete Success'}
    return JsonResponse(context)



