import os

from flask import Flask
# from authlib.integrations.flask_client import OAuth


def create_app():
    app = Flask(__name__)
    app.config.from_mapping(
        SECRET_KEY="brawl",
        DATABASE=os.path.join(app.instance_path, 'tutor.sqlite'),
    )

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/test')
    def check():
    # do an api json check also
        return '<h1><center>Hello, World!</center></h1>\n<script>alert("Hi Mom!")</script>'


    from TutoringFLAME import db
    db.init_app(app)

    from TutoringFLAME import auth
    auth.oauth.init_app(app)
    app.register_blueprint(auth.bp)

    return app




"""
running the app for the first time:
    `flask --app TutoringFLAME init-db`
    `flask --app TutoringFLAME --debug run --port 6500`

running the app after the initialisation on the machine:
    `flask --app TutoringFLAME --debug run --port 6500`
"""