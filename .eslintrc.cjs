module.exports = {
  'env': {
    'browser': false,
    'commonjs': true,
    'es6': true,
    'node': true,
    'mocha': true
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@stylistic',
  ],
  'rules': {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-var': ['warn'
    ],
    'prefer-const': ['warn'
    ],
    'sort-imports': ['warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'
        ],
        allowSeparatedGroups: true,
      }
    ],
    '@stylistic/quotes': ['warn', 'single',
      {
        allowTemplateLiterals: true, avoidEscape: true
      }
    ],
    '@stylistic/comma-dangle': ['warn',
      {
        objects: 'always-multiline', arrays: 'always-multiline'
      }
    ],
    '@stylistic/indent': ['warn',
      2,
      {
        ignoredNodes: ['TemplateLiteral'
        ],
        SwitchCase: 1,
      }
    ],
    '@stylistic/object-curly-spacing': ['warn', 'always'
    ],
    '@stylistic/space-before-blocks': ['warn', 'always'
    ],
    '@stylistic/semi': ['warn', 'never'
    ],
    '@stylistic/eol-last': ['warn', 'always'
    ],
    '@stylistic/no-trailing-spaces': ['warn',
      {
        skipBlankLines: true, ignoreComments: false
      }
    ],
    '@stylistic/keyword-spacing': ['warn',
      {
        after: true, before: true
      }
    ],
    '@stylistic/comma-spacing': ['warn',
      {
        after: true
      }
    ],
    '@stylistic/linebreak-style': [
      'error',
      'unix',
    ],
  }
}
