const { build }  = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');


const shared = {
  entryPoints: ['src/index.ts'],
  platform: 'node',
  sourcemap: true,
  target: 'node15',
  minify: true,
  bundle: true,
  plugins: [nodeExternalsPlugin()]
};

build({
  ...shared,
  outfile: 'dist/index.js',
}).catch((e) => {
  console.error(e);
  process.exit(1);
});

build({
  ...shared,
  outfile: 'dist/index.esm.js',
  format: 'esm',
}).catch((e) => {
  console.error(e);
  process.exit(1);
});