from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, PermissionsMixin)
                                        
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('Users must have an email address'))

        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email,password, **extra_fields) :
        user = self.model(email=email, **extra_fields)

        user.is_superuser = True
        user.set_password(password)
        user.save(using=self._db)
        return user



class User(AbstractBaseUser, PermissionsMixin):
    uid = models.AutoField(primary_key=True)

    email = models.EmailField(max_length=255,unique=True)
    username = models.CharField(max_length=30,unique=True)
    is_active = models.BooleanField(
        verbose_name=_('Is active'),
        default=True
    )
    date_joined = models.DateTimeField(
        verbose_name=_('Date joined'),
        default=timezone.now
    )
    
    profile_image = models.ImageField(upload_to='Image/User/', null=True, blank=True)


    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', ]

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        #ordering = ('-date_joined',)

    def __str__(self):
        return self.username

    def get_full_name(self):        
        return self.username

    def get_short_name(self):
        return self.username
   
    @property
    def is_staff(self):
        return self.is_superuser

