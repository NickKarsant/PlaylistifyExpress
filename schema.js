const Joi = require('joi');

module.exports.playlistSchema = Joi.object({
    playlist: Joi.object({
        title: Joi.string().required(),
        image: Joi.string().required(),
        author: Joi.string().required(),
        songs: Joi.array()
    })
});



