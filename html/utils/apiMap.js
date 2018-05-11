const server={
    // host: "http://192.168.0.104",
    // port: ":8089"
    host: "http://1808399kb5.iask.in",
    port: ":18644"
}

const aiUsePersonId= ["0001A410000000002JEQ" , "0001A410000000002JBP", "0001A410000000002JC3"]


export default API = {
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
        change: server.host+server.port+"",
    }
}