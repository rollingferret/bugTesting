from .db import db


class Skill(db.Model):
    __tablename__ = 'skills'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
