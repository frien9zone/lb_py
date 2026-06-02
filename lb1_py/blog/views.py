from django.shortcuts import render
from .models import Category, Article


def categories_list(request):
    categories = Category.objects.all()

    return render(request, 'categories.html', {
        'categories': categories
    })


def articles_list(request):
    sort = request.GET.get('sort')

    if sort == 'comments':
        articles = Article.objects.order_by('-comments_count')
    else:
        articles = Article.objects.order_by('-publication_date')

    return render(request, 'articles.html', {
        'articles': articles
    })