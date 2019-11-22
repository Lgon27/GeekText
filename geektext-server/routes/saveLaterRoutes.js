const express = require('express');
const saveRoutes = express.Router();

let Save_for_later = require('../models/save_for_later');

// Defined delete | remove | destroy route
saveRoutes.route('/delete/:id').get(function (req, res) {
    Save_for_later.findByIdAndRemove({_id: req.params.id}, function(err, save_for_later){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = saveRoutes;