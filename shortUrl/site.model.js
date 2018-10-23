var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var autoIncrement = require('mongoose-auto-increment');
//var connection = mongoose.createConnection(process.env.MONGO);

// autoIncrement.initialize(connection);

const SiteSchema = new Schema({
  originalURL: String,
  shortURL: String
});


// SiteSchema.plugin(autoIncrement.plugin, {model: 'Site', startAt: 1});
const Site = mongoose.model('Site', SiteSchema);
module.exports = Site;