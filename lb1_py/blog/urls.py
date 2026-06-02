from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.categories_list),
    path('articles/', views.articles_list),
]