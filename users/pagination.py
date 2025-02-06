from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):
    page_size = 900
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'message': '',
            'data': {
                'meta': {
                    'current': self.page.number,
                    'pageSize': self.page_size,
                    'pages': self.page.paginator.num_pages,
                    'total': self.page.paginator.count
                },
                'result': data
            }
        })