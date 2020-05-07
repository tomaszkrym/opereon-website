const path = require('path')
const fs = require('fs-extra')
const cheerio = require('cheerio')

function text(elems) {
    let ret = '', len = elems.length, elem;

    for (let i = 0; i < len; i++) {
        elem = elems[i];
        if (elem.type === 'text') {
            ret += elem.data + '\n';
        } else if (elem.children && elem.type !== 'comment' && elem.tagName !== 'script' && elem.tagName !== 'style') {
            ret += text(elem.children);
        }
    }

    return ret;
}

module.exports = function (api, options) {
    api.afterBuild(({ queue, config }) => {
        const pages = queue
            .filter(page => page.type === 'static' && page.path !== '/404')
            .map(page => {
                let url = page.publicPath || `${page.path}/`.replace(/\/+$/, '/')
                const html = fs.readFileSync(page.htmlOutput)
                const $ = cheerio.load(html, {
                    normalizeWhitespace: false,
                    xmlMode: true,
                })

                let title = $('head > title').text().replace(/ \| .+?$/, '')
                let content = text($('div.content')).replace(/ +/g, ' ').replace(/\s{2,}/g, '\n')

                return {
                    path: url,
                    title: title,
                    content: content,
                }
            })
            .sort((a, b) => a.path.localeCompare(b.path));

        console.log(`Generate ${options.outputJson} (${pages.length} pages)`)

        return fs.outputFile(path.join(config.outputDir, options.outputJson), JSON.stringify(pages))
    })
}

module.exports.defaultOptions = () => ({
    outputJson: '/search.json',
    config: {}
})
