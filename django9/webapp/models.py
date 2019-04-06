from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    title = models.CharField(max_length=30,blank=False, null = False,verbose_name="Название")
    description = models.TextField(max_length=500,blank=True, null = True,verbose_name="Описание")
    def __str__(self):
        return self.title

class Product(models.Model):
    title = models.CharField(max_length=30, blank=False, null=False, verbose_name="Название")
    description = models.TextField(max_length=500,blank=True, null = True, verbose_name="Описание")
    begin_date = models.DateField(blank=True, null = True, verbose_name="Дата поступления")
    price = models.DecimalField(decimal_places=2,max_digits=10,blank=False, null = False,verbose_name="Цена")
    category = models.ManyToManyField(Category,blank=True, verbose_name="Категории")
    def __str__(self):
        return self.title

class PhotoProduct(models.Model):
    product = models.ForeignKey(Product,on_delete=models.PROTECT,blank=False, null = False,verbose_name="Продукт",related_name='photoes')
    image = models.ImageField(upload_to='static/images',blank=False, null = False,verbose_name="Изображение")
    def __str__(self):
        return self.product.title+' photo'

class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.PROTECT,blank=False, null = False)
    products = models.ManyToManyField(Product,blank=False, verbose_name="Список товаров")
    number = models.CharField(max_length=15,blank=False, null = False,verbose_name="Телефон")
    address = models.CharField(max_length=40,blank=True, null = True, verbose_name="Адрес")
    comment = models.TextField(max_length=500,blank=True, null = True,verbose_name="Комментарий")
    created_date = models.DateTimeField(auto_now=True,verbose_name="Дата создания")
    def __str__(self):
        return 'order by '+self.user.username

# Create your models here.
