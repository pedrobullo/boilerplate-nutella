import Helmet from 'react-helmet';

function javascripts(assets = {}) {
  const js = (assets.javascript || {}).main || '';
  const path = (js.length) ?
    `${js.replace('./dist', '/dist')}` : '/dist/main.js';

  return `<script src="${path}" async></script>`;
}

function styles(assets = {}) {
  const css = Object
    .keys(assets.assets || {})
    .map(style => assets.assets[style]._style);
  if (css.length) {
    return `<style>${css.join('')}</style>`;
  }
  return '';
}

function renderHTML(html, initialState = {}, assets = {}) {
  const head = Helmet.renderStatic();
  return `
<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    ${head.base.toString()}
    ${head.title.toString()}
    ${head.meta.toString()}
    ${head.link.toString()}
    ${head.script.toString()}

    <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
    ${styles(assets)}
  </head>
  <body>
    <div id="app">${html}</div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
    </script>
    ${javascripts(assets)}
  </body>
</html>
    `;
}

export default renderHTML;

