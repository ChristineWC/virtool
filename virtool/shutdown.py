from logging import getLogger

from aiohttp.web import Application

from virtool.authorization.utils import get_authorization_client_from_app
from virtool.startup import get_scheduler_from_app

logger = getLogger("shutdown")


async def shutdown_authorization_client(app: Application):
    """
    Attempt to close the OpenFGA client session.

    :param app: The application object
    """
    logger.info("Stopping OpenFGA client")
    await get_authorization_client_from_app(app).openfga.close()


async def shutdown_executors(app: Application):
    """
    Attempt to close the `ThreadPoolExecutor` and `ProcessPoolExecutor`.

    :param app: the application object
    """
    try:
        app["process_executor"].shutdown(wait=True)
    except KeyError:
        pass


async def shutdown_http_client(app: Application):
    """
    Attempt to close the async HTTP client session.

    :param app: The application object
    """
    logger.info("Stopping HTTP client")

    try:
        await app["client"].close()
    except KeyError:
        pass


async def shutdown_redis(app: Application):
    """
    Attempt to close the app's `redis` instance.

    :param app: the application object
    """
    logger.info("Closing Redis connection")

    try:
        app["redis"].close()
        await app["redis"].wait_closed()
    except KeyError:
        pass


async def shutdown_scheduler(app: Application):
    """
    Attempt to the close the app's `aiojobs` scheduler.

    :param app: The application object
    """
    await get_scheduler_from_app(app).close()
