from django.contrib import admin

from .models import Category,  Post , Collection, Like


# Register your models here.
admin.site.register(Category)
admin.site.register(Post)
admin.site.register(Collection)
admin.site.register(Like)
