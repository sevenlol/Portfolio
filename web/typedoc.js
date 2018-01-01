module.exports = {
  mode: 'file',
  out: 'doc',
  excludes : [
    '**/*.spec.ts'
  ],
  theme: 'default',
  ignoreCompilerErrors: true,
  excludePrivate: true,
  excludeNotExported: 'true',
  target: 'ES5',
  moduleResolution: 'node',
  preserveConstEnums: 'true',
  stripInternal: 'true',
  suppressExcessPropertyErrors: 'true',
  suppressImplicitAnyIndexErrors: 'true',
  module: 'commonjs'
};
