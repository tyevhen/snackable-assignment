const axios = require('axios')

const apiPath = 'http://interview-api.snackable.ai/api/file';

async function requestHandler(request) {
  const resp = await request;
  try {
    return resp.data;
  } catch(error) {
    return { error };
  }
};

module.exports = {
  getAllFiles: () => requestHandler(axios.get(apiPath + '/all')),
  getFileDetails: (fileId) => requestHandler(axios.get(apiPath.concat(['/details', fileId].join('/')))),
  getFileSegments: (fileId) => requestHandler(axios.get(apiPath.concat(['/segments', fileId].join('/')))),
}