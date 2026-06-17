from django.urls import path
from .views import ProjectListAPIView, CertificateListAPIView, PerfilListAPIView

urlpatterns = [
    path('projects/', ProjectListAPIView.as_view(), name='lista-projetu'),
    path('certificates/', CertificateListAPIView.as_view(), name='lista-sertifikadu'),
    path('profile/', PerfilListAPIView.as_view(), name='lista-perfil')
]