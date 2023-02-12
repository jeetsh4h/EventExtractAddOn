import json

from flask import Blueprint, session, abort, render_template, url_for, redirect
from authlib.integrations.flask_client import OAuth

from .db import get_db


CLIENT_FILE = json.load(open('client_secret_.json'))['web']


oauth = OAuth()

oauth.register(
    name='TutoringFLAME',
    client_id=CLIENT_FILE['client_id'],
    client_secret=CLIENT_FILE['client_secret'],
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={
        'scope': 'openid email profile'
    }
)


bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/login', methods=['POST'])
def login_oauth():
    redirect_uri = CLIENT_FILE['redirect_uris'][0]
    return oauth.TutoringFLAME.authorize_redirect(redirect_uri)

@bp.route('/login', methods=['GET'])
def login():
    return render_template('auth/login.html')


@bp.route('/authorize')
def authorize():
    token = oauth.TutoringFLAME.authorize_access_token()
    session['user'] = token['userinfo']
    
    db = get_db()
    new_user = True

    try:
        db.execute(
            'INSERT INTO user (email) VALUES (?)',
            (session['user']['email'],)
        )
        db.commit()
    except db.IntegrityError:
        new_user = False        


    return redirect(url_for('check', new_user=new_user))


# have to add the login_required wrapper
# add logout functionality