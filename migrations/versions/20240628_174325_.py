"""empty message

Revision ID: 53c29fd98059
Revises: 368790787ede
Create Date: 2024-06-28 17:43:25.131852

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '53c29fd98059'
down_revision = '368790787ede'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('relationships', schema=None) as batch_op:
        batch_op.alter_column('user1_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('user2_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.drop_column('id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('relationships', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id', sa.INTEGER(), nullable=False))
        batch_op.alter_column('user2_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('user1_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###
