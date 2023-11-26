from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from base.models import User,Order,OrderItem,ShippingAddress,Product
from base.serializers import UserSerializer,UserSerializerWithToken,OrderSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from django.contrib.auth.hashers import make_password
from rest_framework import status
# Create your views here.






@api_view(['POST'])
@permission_classes(['IsAuthenticated'])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0 :
        return Response({'detail' : 'No Order Items' }, status = status.HTTP_400_BAD_REQUEST)
    else:
        # create order

        order = Order.objects.create(
            user =user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice'],
        )

        #create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country'],
        )
        #order and connect to orderItems relationship

        for i in orderItems:
            product = Product.objects.get(_id=i['product'])


            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty= i['qty'],
                price = i['price'],
                image = product.image.url,

            )


        # update stock

        product.countInStock -= item.qty
        product.save()


    serializer = OrderSerializer(order,many = True)
    return Response(serializer.data)












































