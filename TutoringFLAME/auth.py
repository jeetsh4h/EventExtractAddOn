import json

from flask import Blueprint, session, abort, render_template, url_for, redirect
from authlib.integrations.flask_client import OAuth


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


@bp.route('/login')
def login():
    redirect_uri = CLIENT_FILE['redirect_uris'][0]
    return oauth.TutoringFLAME.authorize_redirect(redirect_uri)


@bp.route('/authorize')
def authorize():
    token = oauth.TutoringFLAME.authorize_access_token()
    session['user'] = token['userinfo']
    
    # add userinfo to database
    # build the html files for the above urls

    return redirect(url_for('check'))
