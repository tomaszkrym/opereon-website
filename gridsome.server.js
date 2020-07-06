const fs = require('fs-extra');
const path = require('path');
const gitRepoInfo = require('git-repo-info');

module.exports = function (api) {
  api.loadSource(({ addCollection, addMetadata }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    addMetadata('settings', require('./gridsome.config').settings);
    const repoInfo = gitRepoInfo();
    repoInfo.branch = repoInfo.branch || '';
    addMetadata('repoInfo', repoInfo);

    if (process.env.NODE_ENV === 'production') {
      console.log('git repo info: ', JSON.stringify(repoInfo))
    }
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
}