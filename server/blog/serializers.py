from rest_framework import serializers

from .models import Category


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=100)
    description = serializers.CharField(style={"base_template": "textarea.html"})

    def create(self, validated_data):
        # create a new category instance, once validate_data is received
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)
        # instance.created_at = validated_data.get("created_at", instance.created_at)
        # instance.updated_at = validated_data.get("updated_at", instance.updated_at)
        instance.save()
        return instance
