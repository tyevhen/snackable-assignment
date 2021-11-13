var express = require('express');
var router = express.Router();
var getFileData = require('../services/file').getFileData;

router.get('/:fileId', function(req, res, next) {
  const data = getFileData(req.params.fileId);
  data.then(
    resp => {
      res.send(resp);
    }
  ).catch(
    error => {
      res.send(error.message);
    }
  );
});

module.exports = router;
