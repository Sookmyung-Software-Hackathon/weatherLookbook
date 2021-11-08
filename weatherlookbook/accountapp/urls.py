from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

urlpatterns = [
    # Account
    path("join/", views.join, name="join"), # 회원가입 및 로그인
    # Setting page
    path('edit_username/', views.edit_username, name='edit_username'),
    path('edit_profile/', views.edit_profile, name='edit_profile'),
    path('delete_account/', views.deleteaccount, name='deleteaccount'),
    path('myboard/', views.myboard, name='myboard'),
    #path('mylike/', views.mylike, name='mylike'),
]