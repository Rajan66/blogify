from django.contrib.auth import get_user_model
from rest_framework import generics, serializers, status, filters
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Category, Post
from .serializers import (
    CategorySerializer,
    PostSerializer,
    UserLoginSerializer,
    UserRegisterSerializer,
    UserSerializer,
)

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer


class LoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        userObj = UserSerializer(user)

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": userObj.data
            },
            status=status.HTTP_200_OK,
        )


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [IsAuthenticated]


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [IsAuthenticated]


class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = (filters.SearchFilter,) 
    search_fields = ['title']

    def get_permissions(self):

        if self.request.method == "GET":
            return [AllowAny()]
        elif self.request.method == "POST":
            return [IsAuthenticated()]
        return super().get_permissions()

    def perform_create(self, serializer):
        category_id = self.request.data.get("category")
        if not category_id:
            raise serializers.ValidationError(
                {"category": "This field is required."})

        category = Category.objects.filter(id=category_id).first()
        if not category:
            raise serializers.ValidationError(
                {"category": "Invalid category ID."})

        serializer.save(user=self.request.user, category=category)


class PostRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        elif self.request.method == "PUT" or self.request.method == "DELETE":
            return [IsAuthenticated()]
        return super().get_permissions()


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        elif self.request.method == "PUT" or self.request.method == "DELETE":
            return [IsAuthenticated()]
        return super().get_permissions()

