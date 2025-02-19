from django.urls import path

from . import views

urlpatterns = [
    path("category/", views.CategoryListCreateView.as_view(), name="category_list"),
    path("category/<int:pk>/", views.CategoryDetailView.as_view(), name="category_detail"),
    path("post/", views.PostListCreateView.as_view(), name="post_list"),
    path(
        "post/<int:pk>/", views.PostRetrieveUpdateDestroyView.as_view(), name="post_detail"
    ),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),

    path('user/', views.UserListView.as_view(), name='user_list'),
    path('user/<int:pk>', views.UserDetailView.as_view(), name='user_detail'),
]
