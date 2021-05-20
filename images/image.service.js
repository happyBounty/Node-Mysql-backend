const db = require('_helpers/db');
module.exports = {
    create_image
};
async function create_image(params) {
    // validate
    if (await db.User.findOne({ where: { src: params.src } })) {
        throw 'src "' + params.src + '" is already taken';
    }

    // save user
    await db.Image.create(params);
}