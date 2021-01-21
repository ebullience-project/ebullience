import path from 'path';
import { Configuration, ModuleOptions, ResolveOptions } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import setOption, { Option } from './option';
import getLoaders from './loaders';
import getPlugins from './plugins';

function getConfig(option: Partial<Option>) {
  const {
    isBuild,
    inputFile,
    outputName,
    rootDir,
    srcDir,
    outputDir,
    staticDir,
    showDetailProgress,
    layout,
    host,
    port,
    theme,
    libOnDemand,
    supportIE,
    libraryName,
    style,
    thirdLib
  } = setOption(option);

  const loaders = getLoaders({
    srcDir,
    outputName,
    isBuild,
    theme,
    libOnDemand
  });
  const plugins = getPlugins({
    isBuild,
    outputName,
    showDetailProgress,
    layout,
    srcDir,
    staticDir,
    supportIE,
    style
  });

  const module: ModuleOptions = {
    strictExportPresence: true,
    rules: loaders
  };

  const resolve: ResolveOptions = {
    extensions: ['.wasm', '.js', '.ts', '.tsx', '.json'],
    alias: {
      '@@': rootDir,
      '@': srcDir
    }
  };

  const config: Configuration = {
    context: rootDir,
    entry: {
      index: path.resolve(srcDir, inputFile)
    },
    output: {
      filename: `${outputName}.js`,
      chunkFilename: `${outputName}.js`,
      path: outputDir,
      publicPath: isBuild ? './' : '/',
      ...(layout
        ? {}
        : {
            library: libraryName || 'MyLibrary',
            libraryTarget: 'umd',
            libraryExport: 'default'
          })
    },
    mode: isBuild ? 'production' : 'development',
    devtool: isBuild
      ? layout
        ? false
        : 'source-map'
      : 'eval-cheap-module-source-map',
    module,
    resolve,
    plugins: plugins.plugins,
    optimization: layout
      ? {
          runtimeChunk: 'single',
          minimizer: plugins.optimizationPlugins,
          splitChunks: {
            chunks: 'all',
            // automaticNameDelimiter: '/',
            cacheGroups: {
              react: {
                test: /node_modules\/react/,
                priority: 10
              },
              antd: {
                test: /node_modules\/(antd|@ant-design)/,
                priority: 10
              },
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
              }
            }
          }
        }
      : {
          runtimeChunk: false
        },
    performance: {
      maxEntrypointSize: 1024000,
      hints: false
    },
    externals: (() => {
      const data: { [propName: string]: { [propName: string]: string } } = {};
      const keys = Object.keys(thirdLib);
      keys.forEach((key) => {
        data[key] = {
          commonjs: key,
          commonjs2: key,
          amd: key,
          root: thirdLib[key]
        };
      });
      return data;
    })(),
    stats: {
      colors: true,
      modules: false,
      children: false
    },
    target: supportIE ? 'browserslist:IE 11' : 'web'
  };

  const devServerConfig: DevServerConfiguration = {
    compress: true,
    hot: true,
    port,
    host,
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true
    },
    open: false,
    liveReload: false,
    static: false
  };

  return { config, devServerConfig };
}

module.exports = getConfig;
export default getConfig;
