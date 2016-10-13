import '../styles/global.less';

// windows特殊处理
if (process.env.IS_WINDOWS) {
    require('../static/compatible');
}


if (process.env.NODE_ENV == 'development') {
    console.log('1')
}
else if (process.env.NODE_ENV == 'preview') {
    console.log('2')
}
else if (process.env.NODE_ENV == 'production') {
    console.log('3')
}
