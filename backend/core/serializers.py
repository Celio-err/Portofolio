from rest_framework import serializers
from .models import Projetu, Sertifikadu, Perfil

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projetu
        fields = ['id', 'titulu', 'deskrisaun', 'imajem', 'teknolojia', 'github_link']

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sertifikadu
        # 💡 Disesuaikan dengan field model Sertifikadu terbaru Anda (titulu, tinan, foto)
        fields = ['id', 'titulu', 'tinan', 'foto']

class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfil
        # 💡 Disesuaikan dengan field model Perfil terbaru Anda
        fields = ['id', 'naran', 'data_moris', 'biografia', 'hela_fatin', 'cv_file', 'foto_perfil']