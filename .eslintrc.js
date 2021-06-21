module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        "prettier/prettier": [
            "error",
            {
                // 設定可能なオプションの一部. () はデフォルト値.
                printWidth: 100, // 行の最大長 (80)
                tabWidth: 4, // 1 インデントあたりの空白数 (2)
                useTabs: false, // インデントにタブを使用する (false)
            },
        ],
    },
};
