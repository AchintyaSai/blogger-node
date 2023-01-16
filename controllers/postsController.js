const dbOperations = require('../database/db-operations')
const cryptoLayer = require('../core/crypto-layer')

const getPost = (req, res) => {
    let sqlQuery = "CALL update_view_procedure(" + req.params['postId'] +")"
    dbOperations.executeQuery(sqlQuery).then(data => {
        cryptoLayer.encryptResponse(data[0][0], res)
        return res.end()
    }, err => {
        cryptoLayer.encryptResponse(err, res)
        return res.end()
    })
}

const putPost = (req, res) => {
    let sqlQuery = 'INSERt into posts_table (user_id, post_title, post_desc, post_category) SELECT id, "'+req.body.title+'", "'+req.body.body+'", "'+req.body.category+'" from signup_table WHERE email = "'+req.body.user_email+'";'

    console.log(sqlQuery)

    dbOperations.executeQuery(sqlQuery).then(data => {
        if(data.affectedRows == 0)
            res.writeHead(500, "Post not refelcted");
        else
            res.write(JSON.stringify(data))
        return res.end()
    }, err => {
        res.write(JSON.stringify(err))
        return res.end()
    })
}

const getPostForProfile = (req, res) => {

    let sqlQuery = "SELECT * from posts_table WHERE post_category iN (2,3)"
    dbOperations.executeQuery()
}
module.exports = {
    getPost,
    putPost
}