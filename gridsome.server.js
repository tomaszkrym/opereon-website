const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
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

  api.afterBuild(({ queue, config }) => {
    let pages = [];

    queue
      .filter(page => page.location.path !== '/404/' && (page.type ? page.type === 'static' : true))
      .map(page => {
        const html = fs.readFileSync(page.htmlOutput)
        const $ = cheerio.load(html)

        let title = $('head > title').text().replace(/ \| .+?$/, '');

        pages.push({
          url: page.location.path,
          title: title,
          path: page.location.path.split('/').filter(p => p),
          pages: [],
          toJSON: function () {
            return {
              url: this.url,
              title: this.title,
              pages: this.pages.length ? this.pages : undefined,
            }
          }
        })
      })

    pages.sort((a, b) => a.url.localeCompare(b.url));

    for (let i = pages.length - 1; i >= 0; --i) {
      const page = pages[i];
      for (let j = i - 1; j >= 0; --j) {
        const p = pages[j];
        if (page.url.startsWith(p.url)) {
          p.pages.unshift(page)
          break
        }
      }
    }

    fs.outputFile(path.join(config.outputDir, 'sitemap.json'), JSON.stringify(pages[0], null, '  '))

    console.log(`Generate /sitemap.json (${pages.length} pages)`)
  })

}
