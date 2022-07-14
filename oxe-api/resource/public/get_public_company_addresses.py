from flask_apispec import MethodResource
from flask_apispec import doc
from flask_restful import Resource

from db.db import DB
from decorator.catch_exception import catch_exception
from utils.serializer import Serializer
from utils.response import build_no_cors_response


class GetPublicCompanyAddresses(MethodResource, Resource):

    def __init__(self, db: DB):
        self.db = db

    @doc(tags=['public'],
         description='Get the addresses of a company designated by its ID',
         responses={
             "200": {},
         })
    @catch_exception
    def get(self, id_):

        data = self.db.get(self.db.tables["CompanyAddress"], {"company_id": id_})
        data = Serializer.serialize(data, self.db.tables["CompanyAddress"])

        return build_no_cors_response(data)
