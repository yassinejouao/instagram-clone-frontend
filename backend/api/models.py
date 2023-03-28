from django.db import models
# Create your models here.


class ProfileModel(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    user_name = models.CharField(max_length=50)
    password = models.CharField(max_length=300)
    following = models.ManyToManyField(
        'self', null=True, blank=True)  # 'self' IMP
    followers = models.ManyToManyField('self', null=True, blank=True)
    following_count = models.IntegerField()
    followers_count = models.IntegerField()
    profile_pic = models.ImageField()  # Look this up
    bio = models.CharField(max_length=1000)
    date_time_created = models.DateTimeField(auto_now=True)
    # posts = Relations - to read up on that

    def save(self, *args, **kwargs):
        self.following_count = len(list(self.following))
        self.followers_coun = len(list(self.followers))
        return super().save(self, *args, **kwargs)
