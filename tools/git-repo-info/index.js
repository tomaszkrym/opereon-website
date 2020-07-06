'use strict';

const { execSync } = require('child_process')

module.exports = function gitRepoInfo(options) {
  const info = {
    sha: null,
    shaShort: null,
    branch: null,
    describe: null,
    author: null,
    authorDate: null,
    authorEmail: null,
    committer: null,
    committerEmail: null,
    committerDate: null,
    commitMessage: null,
  }

  info.describe = execSync('git describe --always --long --first-parent', { encoding: 'utf8' }).trim()

  const show = execSync('git show -s --format="%H||||%h||||%aI||||%an||||%ae||||%cI||||%cn||||%ce||||%s||||%D"', { encoding: 'utf8' })
    .split('||||')

  if (show.length !== 10) {
    throw new Error("unknown output from 'git-show'")
  }

  info.sha = show[0]
  info.shaShort = show[1]
  info.authorDate = new Date(show[2])
  info.author = show[3]
  info.authorEmail = show[4]
  info.committerDate = new Date(show[5])
  info.committer = show[6]
  info.committerEmail = show[7]
  info.commitMessage = show[8]

  const refs = show[9].split(',')
    .map(r => r.replace('HEAD -> ', '').trim())
    .filter(r => r.indexOf('HEAD') < 0 && r.indexOf('/') < 0)
  if (refs.length >= 1) {
    info.branch = refs[0].trim()
  }

  return info
}
