const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },

  name: {
    type: String,
    required: true,
  },

  rx_id: {
    type: String,
    required: true,
  },
  od_sph: String,
  od_cyl: String,
  od_axis: String,
  od_add: String,
  od_prism_base: String,
  od_pd: String,

  // patient: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Patients',
  //   required: true,
  //   autopopulate: true,
  // },
  phone: String,
  // country: String,
  address: String,
  email: String,
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
  assigned: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Client', schema);
