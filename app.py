from flask import Flask, render_template
from flask_webpackext.project import WebpackTemplateProject
from flask_webpackext import FlaskWebpackExt
import flask_webpackext
import os

path = os.path.dirname(os.path.abspath(__file__))
flask_webpackext.config.WEBPACKEXT_MANIFEST_PATH = f'{path}/static/manifest.json'
app = Flask(__name__, template_folder='dist')

project = WebpackTemplateProject(
    __name__,
    project_folder='dist/js',
    config_path='config.json',
)

app.config.update(dict(
    WEBPACKEXT_PROJECT=project,
))

# Initialize extension
FlaskWebpackExt(app)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
