import path from 'path';
import {
  ProvidePlugin,
  DefinePlugin,
  ProgressPlugin,
  HotModuleReplacementPlugin,
  WebpackPluginInstance
} from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTagsPlugin from 'html-webpack-tags-plugin';
import StylelintWebpackPlugin from 'stylelint-webpack-plugin';
import WebpackManifestPlugin from 'webpack-manifest-plugin';
import ProgressBarWebpackPlugin from 'progress-bar-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

// use <WebpackPluginInstance> before "new" because d.ts files are conflict

// d.ts file is wrong
const WebpackManifestPluginClass = (<any>WebpackManifestPlugin)
  .WebpackManifestPlugin;

function getConfig({
  isBuild = true,
  outputName = '',
  showDetailProgress = false,
  layout = '',
  srcDir = '',
  staticDir = '',
  supportIE = false,
  style = true
}) {
  const plugins: WebpackPluginInstance[] = [new CleanWebpackPlugin()];

  if (layout)
    plugins.push(
      new HtmlWebpackPlugin({
        hash: true,
        inject: 'body',
        minify: true,
        template: path.resolve(srcDir, layout)
      })
    );

  if (!isBuild && supportIE)
    plugins.push(
      new HtmlWebpackTagsPlugin({
        tags: ['https://unpkg.com/core-js@2.6.0/client/core.min.js'],
        append: false,
        publicPath: false
      })
    );

  if (style)
    plugins.push(
      new StylelintWebpackPlugin({
        files: ['**/*.css', '**/*.less', '**/*.scss', '**/*.sass'],
        failOnError: true
      })
    );

  plugins.push(
    new ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    new DefinePlugin({}),
    <WebpackPluginInstance>new WebpackManifestPluginClass()
  );

  const optimizationPlugins: WebpackPluginInstance[] = [];

  if (showDetailProgress) {
    plugins.push(
      new ProgressPlugin((percentage, message, ...args) => {
        console.info(percentage, message, ...args);
      })
    );
  } else {
    plugins.push(<WebpackPluginInstance>new ProgressBarWebpackPlugin());
  }

  if (isBuild) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: `${outputName}.css`,
        chunkFilename: `${outputName}.css`
      })
    );
    if (layout)
      optimizationPlugins.push(
        new TerserWebpackPlugin({
          terserOptions: {
            parse: {
              ecma: 2020
            },
            compress: {
              ecma: 5,
              comparisons: false,
              inline: 2
            },
            mangle: {
              safari10: true
            },
            keep_classnames: isBuild,
            keep_fnames: isBuild,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          }
        }),
        new CssMinimizerWebpackPlugin({
          minimizerOptions: {
            preset: ['default', { minifyFontValues: { removeQuotes: false } }]
          }
        })
      );
  } else {
    plugins.push(new HotModuleReplacementPlugin());
  }

  if (staticDir)
    plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: staticDir,
            // to: path.parse(staticDir).name
            to: ''
          }
        ]
      })
    );

  return {
    plugins,
    optimizationPlugins
  };
}

export default getConfig;
