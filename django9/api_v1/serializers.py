from webapp.models import *
from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'password')

class CategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:category-detail')

    class Meta:
        model = Category
        fields = ('url', 'id', 'title', 'description')

class InlineCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'title')

class ProductCreateSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:product-detail')

    class Meta:
        model = Product
        fields = ('url', 'id', 'title', 'description', 'begin_date', 'price', 'categories')

class PhotoProductDisplaySerializer(ProductCreateSerializer):
    categories = InlineCategorySerializer(many=True)

class InlinePhotoProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoProduct
        fields = ('id', 'image')

class PhotoProductSerializer(serializers.ModelSerializer):
    #url = serializers.HyperlinkedIdentityField(view_name='api_v1:photo_product')

    # поле, представляющее обратную связь от зала к местам в зале.
    # название поля должно совпадать с related_name внешнего ключа от мест к залу.
    #seats = InlineSeatSerializer(many=True, read_only=True)

    class Meta:
        model = PhotoProduct
        fields = ('id', 'image')#, 'seats')

class ProductSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:product-detail')
    # поле, представляющее обратную связь от зала к местам в зале.
    # название поля должно совпадать с related_name внешнего ключа от мест к залу.
    #seats = InlineSeatSerializer(many=True, read_only=True)
    category = InlineCategorySerializer(many=True, read_only=True)
    photoes = InlinePhotoProductSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ('url', 'id', 'title', 'description','begin_date','category','photoes','price')

class OrderSerializer(serializers.ModelSerializer):
    #url = serializers.HyperlinkedIdentityField(view_name='api_v1:show-detail')
    #user_url = serializers.HyperlinkedRelatedField(view_name='api_v1:user-detail', read_only=True, source='user')
    #products_url = serializers.HyperlinkedRelatedField(view_name='api_v1:products-detail', read_only=True, source='products')

    class Meta:
        model = Order
        fields = ('id', 'number', 'address',  'comment', 'created_date')
