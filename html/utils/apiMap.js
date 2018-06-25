const server={
    host: "http://118.25.24.82",
    port: ":8066"

    // host: "http://101.132.150.0",
    // port: ":8066" 
}

const lesServer= {
    domain: "http://101.132.150.0"
}

// const aiUsePersonId= ["0001A410000000002JEQ" , "0001A410000000002JBP", "0001A410000000002JC3"]


export default API = {
    API_BASE: server.host+ server.port,
    user_check: "http://221.226.106.186:8089/ws/yth/yhrz.xhtml",
    lesFile: lesServer.domain+"/LesFileManageRpcService",
    lesPZ: lesServer.domain,

    checkUpdate: server.host+ server.port+"/app/sqfire/user/checkUpdate",

    get_actId: server.host+ server.port+"/app/sqfire/op/getId",
    upload_file: server.host+ server.port+"/app/sqfire/spFile/uploadFile",
    home_bi: server.host+server.port+"/app/sqfire/aisearch/desktop",
    user_login: server.host+server.port+"/app/sqfire/user/info",
    zichan_list: server.host+server.port+"/app/sqfire/aisearch/list",
    zichan_info: {
        zichan_basic_info: server.host+server.port+"/app/sqfire/aisearch/AiInfo",
        zichan_change_list: server.host+server.port+"/app/sqfire/aisearch/aiChangeInfoList",
        zichan_get_list: server.host+server.port+"/app/sqfire/aisearch/aiGetInfoList",
        zichan_fix_list: server.host+server.port+"/app/sqfire/aisearch/aiFixInfoList",
        zichan_makeover_list: server.host+server.port+"/app/sqfire/aisearch/aiMakeOverInfoList",
        zchan_scrap_list: server.host+server.port+"/app/sqfire/aisearch/aiScrapInfoList",
    },
    zichan_life_list: server.host+server.port+"/app/sqfire/aisearch/aiLifeInfoList",


    dept_list: server.host+server.port+"/app/sqfire/user/dwdepttree",
    user_list: server.host+server.port+"/app/sqfire/user/deptuser",
    place_list: server.host+server.port+"/app/sqfire/placeInfo/list",

    homeGrid: {
        get: server.host+server.port+"/app/sqfire/aisearch/aiGetList",
        borrow:server.host+server.port+"/app/sqfire/aisearch/aiExchangeList",
        return:server.host+server.port+"/app/sqfire/aisearch/aiMakeOverList",
        change:server.host+server.port+"/app/sqfire/aisearch/aiChangeList",
        repiar:server.host+server.port+"/app/sqfire/aisearch/aiFixList",
        deal:server.host+server.port+"/app/sqfire/aisearch/aiScrapList",
        search:server.host+server.port+"/app/sqfire/aisearch/list",
        mine:server.host+server.port+"/app/sqfire/aisearch/list"
    },
    doOperation: {
        apply: server.host+server.port+"/app/sqfire/op/aiGetAdd",
        fix: server.host+server.port+"/app/sqfire/op/aiFixSave",
        scrap: server.host+server.port+"/app/sqfire/op/aiScrapSave",
        makeOver: server.host+server.port+"/app/sqfire/op/aiMakeOverSave",
        change: server.host+server.port+"/app/sqfire/op/aiChangeSave",
    }
}