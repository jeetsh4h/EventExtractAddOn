import sqlite3

from flask import g, current_app, Flask
import click

# g is an object that only persists across a single request
# g stores common global data across the entire codebase of the app
# while current_app is similar to g, but it doesn't start out empty
# it has the config file for the current running app and, points to current app
# if we end up expnading this and using multiple flask objects (like an api for app)
# then current_app allows us to point to the, well, current flask applciation


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()


def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as file:
        db.executescript(file.read().decode('utf8'))


@click.command('init-db')
def init_db_cli():

    init_db()
    click.echo("Initialized the database")


def init_app(app: Flask):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_cli)