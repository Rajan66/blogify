from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()


class Category(models.Model):
    title = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Post(models.Model):
    category = models.ForeignKey(
        Category, related_name="category", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="user",
                             on_delete=models.CASCADE, default=1)
    title = models.CharField(max_length=255)
    content = models.TextField()
    # store the images in /media/post/
    image = models.ImageField(upload_to='posts/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Collection(models.Model):
    user = models.ForeignKey(User, related_name="colleciton_user",
                             on_delete=models.CASCADE, default=1)
    post = models.ForeignKey(Post, related_name="colleciton_post",
                             on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} - {self.post}'
    

class Like(models.Model):
    user = models.ForeignKey(User, related_name="like_user",
                             on_delete=models.CASCADE, default=1)
    post = models.ForeignKey(Post, related_name="like_post",
                             on_delete=models.CASCADE)
    liked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} - {self.post}'
