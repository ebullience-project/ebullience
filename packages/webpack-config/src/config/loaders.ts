import { RuleSetRule } from 'webpack';
import getBabelLoader from './babel';
import getStyleLoader from './style';
import { LibraryImport } from './option';

function getConfig({
  srcDir = 'src',
  outputName = '',
  isBuild = true,
  theme = {},
  libOnDemand = <Partial<LibraryImport>[]>[]
}) {
  const parseLoaders = [
    {
      test: /\.(js|ts)x?$/,
      include: srcDir,
      use: getBabelLoader({ isSrc: true, isBuild, libOnDemand })
    },
    {
      test: /\.(mjs|ts|tsx)$/,
      exclude: /@babel(?:\/|\\{1,2})runtime/,
      use: getBabelLoader({ isSrc: false, isBuild, libOnDemand })
    },
    {
      test: /\.css$/,
      include: srcDir,
      use: getStyleLoader({ isSrc: true, isBuild, theme })
    },
    {
      test: /\.css$/,
      exclude: srcDir,
      use: getStyleLoader({ isSrc: false, isBuild, theme })
    },
    {
      test: /\.(sa|sc|)ss$/,
      include: srcDir,
      use: getStyleLoader({ isSrc: true, preType: 'sass', isBuild, theme })
    },
    {
      test: /\.(sa|sc|)ss$/,
      exclude: srcDir,
      use: getStyleLoader({ isSrc: false, preType: 'sass', isBuild, theme })
    },
    {
      test: /\.less$/,
      include: srcDir,
      use: getStyleLoader({ isSrc: true, preType: 'less', isBuild, theme })
    },
    {
      test: /\.less$/,
      exclude: srcDir,
      use: getStyleLoader({ isSrc: false, preType: 'less', isBuild, theme })
    },
    {
      test: /\.(jpe?g|png|svg|gif|bmp|woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: `image/${outputName}.[ext]`
          }
        }
      ]
    },
    {
      loader: 'file-loader',
      exclude: [
        /\.(js|ts)x?$/,
        /\.(mjs|cjs)$/,
        /\.(c|le|sa|sc|)ss$/,
        /\.json$/,
        /\.html$/
      ],
      options: {
        name: `file/${outputName}.[ext]`
      }
    }
  ];

  const loaders: RuleSetRule[] = [
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      enforce: 'pre',
      include: srcDir,
      loader: 'eslint-loader',
      options: {
        cache: true,
        failOnError: true
      }
    },
    {
      oneOf: parseLoaders
    }
  ];

  return loaders;
}

export default getConfig;
