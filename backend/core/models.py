from django.db import models

# Create your models here.
class Projetu(models.Model):
    titulu = models.CharField(max_length=50)
    deskrisaun = models.TextField()
    imajem = models.ImageField()
    teknolojia = models.CharField(max_length=100)
    github_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.titulu

class Sertifikadu(models.Model):
    titulu = models.CharField(max_length=50)
    tinan = models.CharField(max_length=4)
    foto = models.ImageField()

    def __str__(self):
        return f"{self.titulu}"
    
class Perfil(models.Model):
    naran = models.CharField(max_length=100)
    data_moris = models.DateField()
    biografia = models.TextField()
    hela_fatin = models.CharField(max_length=30)
    cv_file = models.FileField(upload_to='cv_uploads/', blank=True, null=True)
    foto_perfil = models.ImageField(upload_to='perfil/', blank=True, null=True)

    class Meta:
        verbose_name_plural = "Perfil"

    def __str__(self):
        return self.naran