from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("category/", views.category_list, name="category_list"),
    path("category/<int:pk>/", views.category_detail, name="category_detail"),
    path("post/", views.PostListCreate.as_view(), name="post_list"),
    path(
        "post/<int:pk>/", views.PostRetrieveUpdateDestroy.as_view(), name="post_detail"
    ),
]
