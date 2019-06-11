import path from 'path';
import webpack from 'webpack';

const config = {
  entry: './main.js',
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, '../site')
  },
  context: path.resolve(__dirname, '../site')
};

function scripts() {
  return new Promise(resolve =>
    webpack(config, (err, stats) => {
      if (err) console.log('Webpack', err);

      console.log(
        stats.toString({
          /* stats options */
        })
      );

      resolve();
    })
  );
}

module.exports = {
  config,
  scripts
};
