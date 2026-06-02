from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    publication_date = models.DateTimeField()
    comments_count = models.IntegerField(default=0)

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='articles'
    )

    def __str__(self):
        return self.title