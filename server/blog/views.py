from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from .models import Category, Post
from .serializers import CategorySerializer, PostSerializer


# Create your views here.
def index(request):
    return render(request, "Hello world", context={})


@csrf_exempt
def category_list(request):
    """
    List all categorys, or create a new category.
    """
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


@csrf_exempt
def category_detail(request, pk):
    """
    Retrieve, update or delete a single category.
    """
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


@csrf_exempt
def post_list(request):
    if request.method == "GET":
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        data = JSONParser().parse(request)
        print(data)
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def post_detail(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except post.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == "GET":
        serializer = PostSerializer(post)
        return JsonResponse(serializer.data)

    elif request.method == "PUT":
        data = JSONParser().parse(request)
        serializer = PostSerializer(post, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == "DELETE":
        category.delete()
        return HttpResponse(status=204)
