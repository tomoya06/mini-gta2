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
    "import/no-extraneous-dependencies": "off"
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@", "./src"],
        ],
        extensions: [".ts", ".js", ".jsx", ".json"]
      }
    }
  }
};
