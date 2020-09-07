// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard',
        '@vue/prettier'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        'promise/param-names': 1,
        'space-before-function-paren': 0,
        // 未使用的变量，不会报错
        'no-unused-vars': 0,
        // 开启多余空行
        'no-trailing-spaces': 0,
        // 注释没有空格
        'spaced-comment': 0,
        // 解决首行缩进
        'vue/script-indent': ["error", 2, {"baseIndent": 1}],

        // allow async-await
        'eslint-disable-next-line': 'off',
        'eslint-disable': 'off',
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
    // 解决js首行缩进
    overrides: [
        {
            'files': ['*.vue'],
            'rules': {
                'indent': 'off'
            }
        }
    ]
}
