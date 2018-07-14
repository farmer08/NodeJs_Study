let config = null;
/**
 * 通过环境变量切换配置文件
 */
if (process.env.NODE_ENV === 'production') {

    config = require('./prod');
} else {
    config = require('./dev');``
}
module.exports = config;