declare function gitRepoInfo(options?: object): gitRepoInfo.GitRepoInfo;

declare namespace gitRepoInfo {
  export interface GitRepoInfo {
    sha: string;
    shaShort: string;
    branch: string | null;
    describe: string;
    committer: string;
    committerEmail: string;
    committerDate: Date;
    author: string;
    authorEmail: string;
    authorDate: Date;
    commitMessage: string;
  }
}

export = gitRepoInfo;
