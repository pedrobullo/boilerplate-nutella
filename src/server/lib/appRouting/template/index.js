import Helmet from 'react-helmet';

// Currently we dont use asset.javascript from razzle. We already do it with loadable.
const getRazzleAssets = (assets = {}) => {
  if (assets.client) {
    return ({
      javascript: process.env.NODE_ENV === 'production'
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`,
      style: assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''
    });
  }
  return {};
}

// Get bundle assets from async - react-loadable
const getAsyncAssets = (bundles = {}) => {
  const chunks = bundles.filter(bundle => (bundle.file || '').endsWith('.js'));
  const styles = bundles.filter(bundle => (bundle.file || '').endsWith('.css'));
  return ({
    javascript: (chunks || {}).map((chunk) => {
      if (process.env.NODE_ENV === 'production') {
        return `<script src="/${chunk.file}"></script>`;
      }
      return `<script defer crossorigin src="http://${process.env.HOST}:${parseInt(process.env.PORT, 10) + 1}/${chunk.file}"></script>`;
    }).join('\n'),
    style: (styles || {}).map(style =>
      `<link href="${style.publicPath}" rel="stylesheet" type="text/css">`
    ).join('\n'),
  });
};

function renderHTML(
  html,
  initialState = {},
  assets = {},
  bundles = {},
) {
  const head = Helmet.renderStatic();
  const _assets = {
    razzle: getRazzleAssets(assets) || '',
    async: getAsyncAssets(bundles) || '',
  }

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
    ${_assets.razzle.style}
    ${_assets.async.style}
  </head>
  <body>
    <div id="app">${html}</div>

    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
    </script>

    ${_assets.razzle.javascript}
    ${_assets.async.javascript}
  </body>
</html>
    `;
}

export default renderHTML;

