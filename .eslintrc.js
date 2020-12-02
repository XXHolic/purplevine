module.exports = {
  "plugins": [
    "react"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "settings":{
    "react": {
      "version": "16.13.1"
    }
  },
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
  },
  "rules": {
    "no-caller": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-array-constructor": "error",
    "no-iterator": "error",
    "no-proto": "error",
    "no-use-before-define": "error",
    "quotes": [
      "error",
      "single"
    ],
    "indent": [
      "error",
      2
    ],
    "no-multi-spaces": "error",
    "array-bracket-spacing": [
      "error",
      "always"
    ],
    "block-spacing": "error",
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "func-call-spacing": [
      "error",
      "never"
    ],
    "key-spacing": [
      "error",
      {
        "beforeColon": false,
        "afterColon": true
      }
    ],
    "space-before-blocks": "error",
    "space-infix-ops": "error",
    "arrow-spacing": "error",
    "space-before-function-paren": [
      "error",
      "never"
    ],
    "space-in-parens": [
      "error",
      "never"
    ],
    "brace-style": "error",
    "multiline-comment-style": [
      "error",
      "starred-block"
    ],
    "object-curly-newline": [
      "error",
      {
        "multiline": true
      }
    ],
    "eol-last": [
      "error",
      "always"
    ],
    "spaced-comment": [
      "error",
      "always"
    ],
    "comma-style": [
      "error",
      "last"
    ],
    "react/prop-types": 0,
    "react/display-name": 0,
    "multiline-comment-style": 0,
  },
  "ignorePatterns": ["script/*.js", "server/**/**"],
}
