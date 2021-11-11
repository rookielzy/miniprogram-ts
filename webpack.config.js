import { resolve } from 'path'
import { DefinePlugin } from 'webpack'

function relativeFileLoader (ext = '[ext]') {
  return {
    loader: 'file-loader',
    options: {
      useRelativePath: true,
      name: `[name].${ext}`,
      context: 'src'
    }
  }
}

module.exports = {
  entry: './src/app.ts',
  devtool: 'eavl-source-map',
  module: {
    rules: [
      {
        test: '/\.tsx?$/',
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss|wxss|sass)$/,
        include: /src/,
        use: [
          relativeFileLoader('wxss'),
          {
            loader: 'sass-loader',
            options: {
              includePaths: [resolve('src', 'styles'), 'src']
            }
          }
        ]
      },
      {
        test: /\.(json|png|jpg|gif)$/,
        iclude: /src/,
        use: relativeFileLoader()
      },
      {
        test: /\.wxml$/,
        include: /src/,
        use: relativeFileLoader('wxml')
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      wx
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}
