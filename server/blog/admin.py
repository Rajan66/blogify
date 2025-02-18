from django.contrib import admin

from .models import Category, CustomUser, Post

# Register your models here.
admin.site.register(Category)
admin.site.register(Post)
admin.site.register(CustomUser)
