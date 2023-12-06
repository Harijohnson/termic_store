from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('',views.getOrders,name='order'),
    path('add/',views.addOrderItems,name='orders-add'),
    path('myorders/',views.getMyOrders,name='myorder'),


    path('<str:pk>/delivered/',views.updateOrderToDelivered,name='order-delivered'),




    path('<str:pk>/',views.getOrderById,name='user-order'),
    path('<str:pk>/pay/',views.updateOrderToPaid,name='pay'),

]