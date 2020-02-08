import * as github from '@actions/github';
import * as core from '@actions/core'
import Octokit from '@octokit/rest';

async function run(): Promise<void> {
  try {
    core.info('Log info');
    const repoToken = core.getInput('repo-token');
    const octokit : Octokit.Octokit = new github.GitHub(repoToken) as any;
    const context = github.context;

    const res = await octokit.repos.getContents({
      ...context.repo,
      path: 'package.json'
    });

    if(!Array.isArray(res.data)){
      const content = res.data.content;
      core.info(content || '');
    }

  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
