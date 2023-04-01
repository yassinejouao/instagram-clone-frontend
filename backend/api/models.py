from django.db import models
# Create your models here.


class ProfileModel(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='ID',
                          auto_created=True, serialize=False)
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    user_name = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=300)
    following = models.ManyToManyField(
        'self', blank=True, null=True)  # 'self' IMP
    followers = models.ManyToManyField('self', blank=True, null=True)
    profile_pic = models.ImageField(blank=True, null=True)  # Look this up
    bio = models.CharField(max_length=1000, blank=True)
    createdAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user_name}'


class PostsModel(models.Model):
    user = models.ForeignKey(ProfileModel, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now=True)
    picture = models.ImageField()
    body = models.CharField(max_length=1000)
    caption = models.CharField(max_length=200)
    likes = models.IntegerField()


class CommentsModel(models.Model):
    post = models.ForeignKey(PostsModel, on_delete=models.CASCADE)
    body = models.CharField(max_length=1000)
    createdAt = models.DateTimeField(auto_now=True)
