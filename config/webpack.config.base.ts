import { Configuration } from 'webpack';
import { fileURLToPath, URL } from 'url';

function fileToPath(path: string) {
	return fileURLToPath(new URL(path, import.meta.url));
}

const config: Configuration = {
	entry: {
		path: fileToPath('../src/index.tsx'),
	},
	output: {
		filename: '../static/js/[name][chunkName].js',
		path: fileToPath('../dist'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(ts)x?$/,
				exclude: /node_modules/,
				options: {
					presets: ['@babel/preset-react', '@babel/preset-typescript'],
				},
			},
		],
	},
	resolve: {
		extensions: ['.js', '.tsx', '.ts'],
	},
};

export default config;
