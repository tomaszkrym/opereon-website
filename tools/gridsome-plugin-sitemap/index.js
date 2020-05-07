const path = require('path')
const fs = require('fs-extra')
const micromatch = require('micromatch')
const sitemap = require('sitemap')
const cheerio = require('cheerio')

module.exports = function (api, options) {
    const normalize = p => p.replace(/\/+$/, '') || '/'
    const exclude = options.exclude.slice().map(p => normalize(p))

    exclude.push('/404') // always exclude 404 page

    api.afterBuild(({ queue, config }) => {
        if (!config.siteUrl) {
            throw new Error(`Sitemap plugin is missing a required siteUrl config.`)
        }

        const patterns = Object.keys(options.config).map(key => ({
            pattern: normalize(key),
            key
        }))

        const filenameXml = path.join(config.outputDir, options.outputXml)
        const filenameJson = path.join(config.outputDir, options.outputJson)

        const pathPrefix = config.pathPrefix !== '/' ? config.pathPrefix : ''
        const staticUrls = options.staticUrls || []
        let pages = queue
            .filter(page => page.type ? page.type === 'static' : true)
            .filter(page => micromatch(page.path, exclude).length < 1)
            .map(page => {
                const pattern = patterns.find(p => micromatch.isMatch(page.path, p.pattern))
                const urlConfig = pattern ? options.config[pattern.key] : {}
                let url = page.publicPath || `${page.path}/`.replace(/\/+$/, '/')
                url = url.startsWith(pathPrefix) ? url.substr(pathPrefix.length) : url

                const html = fs.readFileSync(page.htmlOutput)
                const $ = cheerio.load(html)
                let title = $('head > title').text().replace(/ \| .+?$/, '')

                return {
                    url: url,
                    priority: urlConfig.priority,
                    changefreq: urlConfig.changefreq,
                    title: title,
                    path: page.location.path.split('/').filter(p => p),
                    pages: [],
                    toJSON: function () {
                        return {
                            path: this.url,
                            title: this.title,
                            pages: this.pages.length ? this.pages : undefined,
                        }
                    }
                }
            })
            .sort((a, b) => a.url.localeCompare(b.url));

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

        if (typeof (options.processPages) === 'function') {
            pages = options.processPages(pages) || pages
        }

        const xml = sitemap.createSitemap({
            hostname: normalize(config.siteUrl) + pathPrefix,
            cacheTime: options.cacheTime,
            urls: [...pages, ...staticUrls]
        })

        console.log(`Generate ${options.outputXml} (${pages.length + staticUrls.length} pages)`)
        console.log(`Generate ${options.outputJson} (${pages.length} pages)`)

        return Promise.all([
            fs.outputFile(filenameXml, xml.toString()),
            fs.outputFile(filenameJson, JSON.stringify(pages[0]))
        ])
    })
}

module.exports.defaultOptions = () => ({
    outputXml: '/sitemap.xml',
    outputJson: '/sitemap.json',
    cacheTime: 600000,
    staticUrls: [],
    exclude: [],
    processPages: null,
    config: {}
})
