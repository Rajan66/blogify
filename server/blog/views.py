from django.contrib.auth import authenticate, login
from django.http import HttpResponse, JsonResponse
from rest_framework import generics
from rest_framework.parsers import JSONParser

from .models import Category, Post
from .serializers import CategorySerializer, PostSerializer


def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse(status=200)
        else:
            return JsonResponse(status=401)


def category_list(request):
    if request.method == "GET":
        categorys = Category.objects.all()
        serializer = CategorySerializer(categorys, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        data = JSONParser().parse(request)
        print(data)
        serializer = CategorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


def category_detail(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except category.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == "GET":
        serializer = CategorySerializer(category)
        return JsonResponse(serializer.data)

    elif request.method == "PUT":
        data = JSONParser().parse(request)
        serializer = CategorySerializer(category, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == "DELETE":
        category.delete()
        return HttpResponse(status=204)


class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = "pk"
