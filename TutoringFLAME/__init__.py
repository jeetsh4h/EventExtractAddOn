import os

from flask import Flask, session


def create_app():
    app = Flask(__name__)
    app.config.from_mapping(
# temp key, will make it safer later
        SECRET_KEY="brawl",
# something seems off here, will probably change it
        DATABASE=os.path.join(app.instance_path, 'tutor.sqlite'),
    )

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/test?<new_user>')
    def check(new_user):
# I don't know why this has to have an equality sign
# this is breaking randomly, dont know why
        print(session['user']['name'])
        if new_user == True:
            return '<h1><center>Hello, {}</center></h1>'.format(session['user']['name'])
        else:
            return '<h1><center>Hello, User</center></h1>'


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