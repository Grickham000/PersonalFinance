# urls.py
from django.urls import path
from django.urls import re_path
from .views import UserDetail, UserList
from .views import CreateUserView
from Users import views

urlpatterns = [
    path('users/create',CreateUserView.as_view(),name='create-user'),
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
]