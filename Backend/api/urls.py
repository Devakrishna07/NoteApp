from django.urls import path
from .views import TodoListCreate, TodoDetail, RegisterAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('todos/', TodoListCreate.as_view(), name='todo_list_create'),
    path('todos/<int:pk>/', TodoDetail.as_view(), name='todo_detail'),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
