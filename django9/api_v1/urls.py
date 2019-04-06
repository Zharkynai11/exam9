from django.urls import include, path
from rest_framework import routers
from api_v1 import views


router = routers.DefaultRouter()
router.register(r'products', views.ProductViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'photo_product', views.PhotoProductViewSet)
router.register(r'orders', views.OrderViewSet)

app_name = 'api_v1'

urlpatterns = [
    path('', include(router.urls)),

]
