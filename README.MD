#注释：
1. 安卓图标显示过长: 
    修改了native-echarts的Echarts/index.js，将scalesPageToFit={false} => scalesPageToFit={Platform.OS === 'ios'?false:true} 