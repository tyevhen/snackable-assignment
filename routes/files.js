var express = require('express');
var router = express.Router();
var fileService = require('../services/file');

router.get('/:fileId', function(req, res, next) {
  const data = fileService.getFileData(req.params.fileId);
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
