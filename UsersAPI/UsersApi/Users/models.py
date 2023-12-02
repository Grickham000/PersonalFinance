from django.db import models

# Create your models here.
class Meta:
    permissions = (
        ("can_view_finatial_data","Can view the finantial data for the user"),
        ("owns_finatial_data","Can view, edit and insert new finantial data"),
        )