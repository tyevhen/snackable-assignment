const cache = require('./cache')
const { getAllFiles, getFileDetails, getFileSegments } = require('./snackable');

async function getFileData(fileId) {
  let files = [];

  // Check if file info was cached already. If true: return right away.
  const cacheFile = await cache.get(fileId);
  if (cacheFile) return JSON.parse(cacheFile);
  
  files = await getAllFiles();
  const file = files.filter(file => file.fileId === fileId)[0];

  // const file = {fileId: '0000-0000', processingStatus: 'PROCESSING'};

  if (file && file.processingStatus === 'FINISHED') {   
    const details = await getFileDetails(fileId);
    const segments = await getFileSegments(fileId);
    cache.set(fileId, { ...file, details, segments });
    
    return { ...file, details, segments };
  } else {
    throw Error('Exception: requested file info is not ready');
  }
}

module.exports = {
  getFileData
};