from .db import db, environment, SCHEMA, add_prefix_for_prod

devskills = db.Table(
    'devskills',
    db.Column('developerId', db.Integer, db.ForeignKey('developers.id', ondelete='CASCADE'), primary_key=True, nullable=False),
    db.Column('skillId', db.Integer, db.ForeignKey('skills.id'), primary_key=True, nullable=False)
)
