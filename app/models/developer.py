from .db import db, environment, SCHEMA, add_prefix_for_prod
from .dev_skills import devskills

class Developer(db.Model):
    __tablename__ = 'developers'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    icon = db.Column(db.String, nullable=False)
    bio = db.Column(db.String, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)

    skills = db.relationship('Skill', secondary=devskills)
    
    db.relationship('devskills', cascade='all, delete')
    db.relationship('Review', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "icon": self.icon,
            "bio": self.bio,
            "userId": self.userId,
            "city": self.city,
            "state": self.state,
            "skills": [skill.name for skill in self.skills]
        }
