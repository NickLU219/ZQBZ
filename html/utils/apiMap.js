const server={
    // host: "http://192.168.0.104",
    // host: "http://172.20.10.12",
    // port: ":80"
    host: "http://1808399kb5.iask.in",
    port: ":18644"
}

const aiUsePersonId= ["0001A410000000002JEQ" , "0001A410000000002JBP", "0001A410000000002JC3"]

export default API = {
    user_login: server.host+server.port+"/app/sqfire/user/info",
    zichan_list: server.host+server.port+"/app/sqfire/aisearch/list",
    // zichan_list_tmp: "http://192.168.0.105:8081/data.json"
    homeGrid: {
        get: server.host+server.port+"/app/sqfire/aisearch/aiGetList",
        borrow:server.host+server.port+"/app/sqfire/aisearch/aiExchangeList",
        return:"",
        change:"",
        repiar:"",
        deal:"",
        search:"",
        mine:""
    }
}