module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "linebreak-style": "off",
    "import/no-extraneous-dependencies": "off",
    "no-param-reassign": "warn",
    "no-underscore-dangle": "off",
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@", "./src"],
          ["assets", "./assets"],
        ],
        extensions: [".ts", ".js", ".jsx", ".json"]
      }
    }
  }
};
