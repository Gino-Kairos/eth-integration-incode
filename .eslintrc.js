module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {},
};