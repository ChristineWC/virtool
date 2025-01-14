"""
Create all database indexes

Revision ID: l20h8fsbbb28
Date: 2023-01-31 00:56:11.597898

"""
import asyncio

import arrow
from pymongo import ASCENDING, DESCENDING, IndexModel

from virtool.migration import MigrationContext

# Revision identifiers.
name = "Create all database indexes"
created_at = arrow.get("2023-01-31 00:56:11.597898")
revision_id = "l20h8fsbbb28"

alembic_down_revision = None
virtool_down_revision = "6q5k8tz8uph3"


async def upgrade(ctx: MigrationContext):
    """
    Create all database indexes.

    This was formerly done on application startup. It did not make sense to do this
    everytime the application started when new indexes are rarely introduced.
    """
    await ctx.mongo.analyses.create_indexes(
        [
            IndexModel([("sample.id", ASCENDING)]),
            IndexModel([("created_at", DESCENDING)]),
        ]
    )

    await ctx.mongo.groups.create_index("name", unique=True, sparse=True)

    await ctx.mongo.history.create_indexes(
        [
            IndexModel([("otu.id", ASCENDING)]),
            IndexModel([("index.id", ASCENDING)]),
            IndexModel([("created_at", ASCENDING)]),
            IndexModel([("otu.name", ASCENDING)]),
            IndexModel([("otu.version", DESCENDING)]),
        ]
    )

    await ctx.mongo.indexes.create_index(
        [("version", ASCENDING), ("reference.id", ASCENDING)], unique=True
    )

    await ctx.mongo.keys.create_indexes(
        [
            IndexModel([("id", ASCENDING)], unique=True),
            IndexModel([("user.id", ASCENDING)]),
        ]
    )

    await ctx.mongo.otus.create_indexes(
        [
            IndexModel([("_id", ASCENDING), ("isolate.id", ASCENDING)]),
            IndexModel([("name", ASCENDING)]),
            IndexModel([("nickname", ASCENDING)]),
            IndexModel([("abbreviation", ASCENDING)]),
            IndexModel([("reference.id", ASCENDING), ("remote.id", ASCENDING)]),
        ]
    )

    await ctx.mongo.samples.create_index([("created_at", DESCENDING)])

    await ctx.mongo.sequences.create_indexes(
        [
            IndexModel([("otu_id", ASCENDING)]),
            IndexModel([("name", ASCENDING)]),
            IndexModel([("reference.id", ASCENDING), ("remote.id", ASCENDING)]),
        ]
    )

    await ctx.mongo.users.create_indexes(
        [
            IndexModel([("b2c_oid", ASCENDING)], unique=True, sparse=True),
            IndexModel([("handle", ASCENDING)], unique=True, sparse=True),
        ]
    )


async def test_upgrade(ctx: MigrationContext, snapshot):
    await upgrade(ctx)

    assert (
        await asyncio.gather(
            ctx.mongo.analyses.index_information(),
            ctx.mongo.groups.index_information(),
            ctx.mongo.history.index_information(),
            ctx.mongo.indexes.index_information(),
            ctx.mongo.keys.index_information(),
            ctx.mongo.otus.index_information(),
            ctx.mongo.samples.index_information(),
            ctx.mongo.sequences.index_information(),
            ctx.mongo.users.index_information(),
        )
        == snapshot
    )
