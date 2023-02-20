from flask_sqlalchemy import SQLAlchemy
from .db import db

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    userId = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    developerId = db.Column(db.Integer, db.ForeignKey('developers.id', ondelete='CASCADE'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "userId": self.userId,
            "developerId": self.developerId,
            "rating": self.rating,
        }
