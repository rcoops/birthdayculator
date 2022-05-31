const { build } = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const { Generator } = require('npm-dts');

const isDev = process.argv.some((a) => a === '--dev');

const shared = {
  entryPoints: ['src/index.ts'],
  platform: 'node',
  sourcemap: isDev,
  target: 'node15',
  minify: true,
  bundle: true,
  watch: isDev,
  plugins: [nodeExternalsPlugin()],
};

build({
  ...shared,
  outfile: 'dist/index.js',
}).catch(() => {
  process.exit(1);
});

build({
  ...shared,
  outfile: 'dist/index.esm.js',
  format: 'esm',
}).catch(() => {
  process.exit(1);
});

new Generator({
  entry: 'index.ts',
  output: 'dist/index.d.ts',
}).generate();
