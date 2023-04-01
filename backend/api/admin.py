from django.contrib import admin
from .models import *
# Register your models here.


@admin.register(ProfileModel)
class ProfileAdmin(admin.ModelAdmin):
    pass


@admin.register(PostsModel)
class PostsAdmin(admin.ModelAdmin):
    pass


@admin.register(CommentsModel)
class CommentsAdmin(admin.ModelAdmin):
    pass
