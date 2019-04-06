from django.views.decorators.csrf import csrf_exempt
from webapp.models import *
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from api_v1.serializers import *

class UserCreateView(CreateAPIView):
    model = User
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# Базовый класс ViewSet, основанный на ModelViewSet,
# но с отключенной проверкой аутентификации, и не блокирующий запросы без токена.
class NoAuthModelViewSet(viewsets.ModelViewSet):
    authentication_classes = []



class CategoryViewSet(NoAuthModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(NoAuthModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class PhotoProductViewSet(NoAuthModelViewSet):
    queryset = PhotoProduct.objects.all()
    serializer_class = PhotoProductSerializer

class OrderViewSet(NoAuthModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

"""
class ShowViewSet(NoAuthModelViewSet):
    queryset = Show.objects.all()
    serializer_class = ShowSerializer
"""
