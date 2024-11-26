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
  rxid: {
    type: String,
    required: true,
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patients',
    required: true,
    autopopulate: true,
  },
  date: {
    type: Date,
    required: true,
  },

  odsph: {
    type: String,
    required: true,
  },
  odcyl: {
    type: String,
    required: true,
  },
  odaxis: {
    type: String,
    required: true,
  },
  odadd: {
    type: String,
    required: true,
  },
  odprismbase: {
    type: String,
    required: true,
  },
  odpd: {
    type: String,
    required: true,
  },

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

module.exports = mongoose.model('Prescription', schema);
