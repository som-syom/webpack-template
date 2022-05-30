const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // parcel index.html
  // 파일을 읽어들이기 시작하는 진입점 설정
  // 참고 사이트 : https://webpack.js.org/configuration/entry-context/
  entry: "./js/main.js",

  // 결과물(번들)을 반환하는 설정
  output: {
    path: path.resolve(__dirname, "dist"), // node.js 에서 필요로하는 절대 경로를 지정해야 함
    // path.resolve() : 절대 경로를 지정하는 함수
    // __dirname : 현재 webpack.config.js 파일이 존재하는 폴더의 절대 경로(node.js 전역 변수)
    // 설정하지 않으면 dist 폴더에 생성됨
    filename: "main.js",
    // 설정하지 않으면 entry 파일 이름 그대로 생성 됨
    clean: true, // 이전에 만들어진 결과물을 삭제하는 설정
  },
  // 참고 사이트 : https://webpack.js.org/configuration/output/#outputpath

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          "style-loader", // html 에서 css 를 사용할 수 있도록 스타일 로더를 사용함
          "css-loader", // js 파일에서 css 파일을 사용할 수 있도록 변환해주는 loader
          "postcss-loader",
          "sass-loader", // css 파일에서 sass 파일을 사용할 수 있도록 변환해주는 loader
          // 순서가 중요함!
        ],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
    ],
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: "./index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "static" }],
    }),
  ],

  devServer: {
    host: "localhost",
  },
};
