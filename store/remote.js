const request = require('request')


function createRemoteDB(host, port) {
    const URL = `http://${host}:${port}`

    function list(table) {
        const url = `${URL}/${table}`
        return req('GET',url)
    }

    function get(table,id) {
        const url = `${URL}/${table}/${id}`
        return req('GET',url)
    }

    function upsert(table,data) {
        
    }

    function query(table, query, join) {
        
    }

    function req(method, url, data) {
        //let url_service = `${URL}/${url}`
        body = ''

        return new Promise((resolve,reject)=>{
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body,
            },(error, req, body) => {
                if(error){
                    console.error('Error en la BD remota')
                    return reject(error.message)
                }

                const resp = JSON.parse(body)
                return resolve(resp.body)
            })
        })
    }

    return {
        list,
        get,
    }
}

module.exports = createRemoteDB