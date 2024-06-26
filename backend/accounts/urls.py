from django.urls import path
from .views import *

app_name = 'accounts'
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/addcontact/', AddContactView.as_view(), name='add_contact'),
    path('profile/contacts/', ContactView.as_view(), name='contact'),
    path('profile/deletecontact/', DeleteContactView.as_view(), name='delete_contact')
]
