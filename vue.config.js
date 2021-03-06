module.exports = {
    //webpack配置
	configureWebpack: {
	    //警告 webpack 的性能提示
	    performance: {
	    	hints:'warning',
	    	//入口起点的最大体积
	    	maxEntrypointSize: 50000000,
	    	//生成文件的最大体积
	    	maxAssetSize: 30000000,
	    	//只给出 js 文件的性能提示
	    	assetFilter: function(assetFilename) {
	    		return assetFilename.endsWith('.js');
	    	}
	    }
    },
	
	devServer: {
		proxy: {
			'/api': {
				target: 'http://175.24.88.62:8080/pcs',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
	outputDir: 'dist',
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
}