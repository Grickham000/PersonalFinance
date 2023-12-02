# yourapp/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User,Group
from django.contrib.auth import get_user_model
UserModel = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    groups = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all(), many=True, required=False)

    def create(self, validated_data):
    
        groups_data = validated_data.pop('groups', None)

        user = UserModel.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
                # Add user to groups if provided
        if groups_data:
            user.groups.set(groups_data)


        return user

    class Meta:
        model = UserModel
        # Tuple of serialized model fields (see link [2])
        fields = ( "id", "username", "password","email","groups" )