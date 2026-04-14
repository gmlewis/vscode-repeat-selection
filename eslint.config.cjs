const js = require('@eslint/js')
const stylistic = require('@stylistic/eslint-plugin')

module.exports = [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/out/**',
      '**/*.vsix',
      '.vscode-test/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.cjs'],
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node environments
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
        console: 'readonly',
        // Mocha environments
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        after: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        suite: 'readonly',
        test: 'readonly',
        setup: 'readonly',
        teardown: 'readonly',
        suiteSetup: 'readonly',
        suiteTeardown: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-var': 'warn',
      'prefer-const': 'warn',
      'sort-imports': ['warn',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single',
          ],
          allowSeparatedGroups: true,
        },
      ],
      '@stylistic/quotes': ['warn', 'single',
        {
          allowTemplateLiterals: 'always', avoidEscape: true,
        },
      ],
      '@stylistic/comma-dangle': ['warn',
        {
          objects: 'always-multiline', arrays: 'always-multiline',
        },
      ],
      '@stylistic/indent': ['warn',
        2,
        {
          ignoredNodes: ['TemplateLiteral',
          ],
          SwitchCase: 1,
        },
      ],
      '@stylistic/object-curly-spacing': ['warn', 'always',
      ],
      '@stylistic/space-before-blocks': ['warn', 'always',
      ],
      '@stylistic/semi': ['warn', 'never',
      ],
      '@stylistic/eol-last': ['warn', 'always',
      ],
      '@stylistic/no-trailing-spaces': ['warn',
        {
          skipBlankLines: true, ignoreComments: false,
        },
      ],
      '@stylistic/keyword-spacing': ['warn',
        {
          after: true, before: true,
        },
      ],
      '@stylistic/comma-spacing': ['warn',
        {
          after: true,
        },
      ],
      '@stylistic/linebreak-style': [
        'error',
        'unix',
      ],
    },
  },
]
