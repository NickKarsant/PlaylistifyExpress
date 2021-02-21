const Joi = require('joi');
const { number } = require('joi');

module.exports.playlistSchema = Joi.object({
    playlist: Joi.object({
        title: Joi.string().required(),
        image: Joi.string().required(),
        songs: Joi.array()
    })
});



