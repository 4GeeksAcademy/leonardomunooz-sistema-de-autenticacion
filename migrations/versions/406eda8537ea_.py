"""empty message

Revision ID: 406eda8537ea
Revises: b18122aa855e
Create Date: 2024-11-09 19:25:59.268333

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '406eda8537ea'
down_revision = 'b18122aa855e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=180),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.String(length=180),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)

    # ### end Alembic commands ###