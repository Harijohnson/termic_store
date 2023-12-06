from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Product
from base.serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view,permission_classes
from django.views.decorators.csrf import csrf_exempt




@api_view(['POST'])
@permission_classes([IsAdminUser])
def uploadImage(request):
    data = request.data
    # print('LOOK BELOW FOR DATA')
    # print(data)
    product_id = data['product_id']


   

    product = Product.objects.get(_id=product_id)


    # Check if 'image' key exists in request.FILES
    if 'image' in request.FILES:
        product.image = request.FILES['image']
        product.save()
        return Response('Image was Uploaded')
    else:
        return Response('No image provided', status=400)











@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products,many =  True)
    return Response(serializer.data)





@api_view(['GET'])
def getProduct(request,pk):
    # print('the pk is '+pk)
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many =  False)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product  = Product.objects.create(
        user = user,
        name = 'Sample Name',
        price = 0,
        brand = 'Sample Brand',
        countInStock = 0,
        category = 'Sample category',
        description = 'Sample Discription',
        ratings = 0,
    )
    serializer = ProductSerializer(product,many =  False)
    return Response(serializer.data)


@csrf_exempt
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    # print('the pk is '+pk)
    data =request.data

    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many =  False)
    return Response(serializer.data)




@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product is deleted')


