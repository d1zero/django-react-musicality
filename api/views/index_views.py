from django.shortcuts import render

def index(request):
    return render(request, 'index.html')


def index_pk(request, pk):
    return render(request, 'index.html')


def index_code(request, code):
    return render(request, 'index.html')
