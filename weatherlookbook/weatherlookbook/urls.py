from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('crawlingapp/', include('crawlingapp.urls')),
    path('accountapp/', include('accountapp.urls')),
    path('boardapp/', include('boardapp.urls')),
    path('likeapp/', include('likeapp.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
