const dbOperations = require('../database/db-operations')

const getPost = (req, res) => {
    let sqlQuery = "CALL update_view_procedure(" + req.params['postId'] +")"
    dbOperations.executeQuery(sqlQuery).then(data => {
        res.write(JSON.stringify(data[0][0]))
        return res.end()
    }, err => {
        res.write(JSON.stringify(err))
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

module.exports = {
    getPost,
    putPost
}