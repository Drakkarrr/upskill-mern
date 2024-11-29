const fs = require('fs');

const mongoose = require('mongoose');

const mail = async (req, res) => {
  return res.status(200).json({
    success: true,
    result: null,
    message: 'Test - Successful trigger',
  });
};

module.exports = mail;
