import dotenv
from rest_framework.response import Response
from django.conf import settings

dotenv.load(settings.BASE_DIR / 'config/.env')

def check_api_token(request):
    api_token = request.headers['authorization']
    if not api_token or api_token != dotenv.get('API_TOKEN'):
        return Response({'message': 'Не лезь пожалуйста куда не надо)'})