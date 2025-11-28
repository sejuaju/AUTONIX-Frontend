const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: false,
  entry: {
    app: './autonix/js/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[contenthash:16].js',
    clean: true,
    publicPath: '/whitepaper/',
    hashFunction: 'xxhash64'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    '@csstools/postcss-global-data',
                    {
                      files: [
                        path.resolve(__dirname, 'css-variables.css')
                      ]
                    }
                  ],
                  [
                    'postcss-css-variables',
                    {
                      preserve: false
                    }
                  ],
                  'postcss-discard-comments',
                  'postcss-normalize-whitespace'
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: '[contenthash:16][ext]'
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: '[contenthash][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './autonix/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[contenthash:16].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'autonix/images',
          to: 'images',
          noErrorOnMissing: true
        },
        {
          from: 'autonix/logo.jpg',
          to: 'logo.jpg',
          noErrorOnMissing: true
        }
      ]
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
            passes: 3
          },
          mangle: {
            toplevel: true,
            properties: {
              regex: /^_/
            }
          },
          format: {
            comments: false
          }
        },
        extractComments: false
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              normalizeWhitespace: true,
              colormin: {
                legacy: true
              },
              convertValues: {
                length: true,
                angle: true,
                time: true
              },
              discardDuplicates: true,
              discardEmpty: true,
              discardOverridden: true,
              discardUnused: {
                fontFace: true,
                counterStyle: true,
                keyframes: true,
                namespace: true
              },
              mergeIdents: true,
              mergeLonghand: true,
              mergeRules: true,
              minifyFontValues: true,
              minifyGradients: true,
              minifyParams: true,
              minifySelectors: true,
              normalizeCharset: true,
              normalizeDisplayValues: true,
              normalizePositions: true,
              normalizeRepeatStyle: true,
              normalizeString: true,
              normalizeTimingFunctions: true,
              normalizeUnicode: true,
              normalizeUrl: true,
              orderedValues: true,
              reduceIdents: {
                keyframes: true,
                counterStyle: true
              },
              reduceInitial: true,
              reduceTransforms: true,
              svgo: {
                encode: true,
                multipass: true
              },
              uniqueSelectors: true,
              zindex: true
            }
          ]
        },
        parallel: true
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.css']
  }
};