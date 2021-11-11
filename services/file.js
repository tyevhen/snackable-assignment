const axios = require('axios')

async function getFileData(fileId) {
  this.apiPath = 'http://interview-api.snackable.ai/api/file';
  this.files = [];

  const resp = await axios.get(this.apiPath + '/all');
  this.files = resp.data;

  const file = this.files.filter(file => file.fileId === fileId)[0];

//   const file = {fileId: '0000-0000', processingStatus: 'PROCESSING'};

  if (file && file.processingStatus === 'FINISHED') {   
    const detailsResp = await axios.get(this.apiPath.concat(['/details', file.fileId].join('/')));
    const segmentsResp = await axios.get(this.apiPath.concat(['/segments', file.fileId].join('/')));
    return { ...file, details: detailsResp.data, segments: segmentsResp.data };
  } else {
    throw Error('Requested file info is not ready');
  }
}

module.exports = {
    getFileData: getFileData
}