from rest_framework.generics import ListAPIView
from .models import Projetu, Sertifikadu, Perfil
from .serializers import ProjectSerializer, CertificateSerializer, PerfilSerializer

class ProjectListAPIView(ListAPIView):
    queryset = Projetu.objects.all()
    serializer_class = ProjectSerializer

class CertificateListAPIView(ListAPIView):
    queryset = Sertifikadu.objects.all()
    serializer_class = CertificateSerializer

class PerfilListAPIView(ListAPIView):
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer