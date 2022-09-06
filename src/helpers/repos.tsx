import { IRepos } from "../components/context/user";

/**
 * Count the up the primary language used in a list of repos
 * @param repos
 * @returns
 */
export function countLanguages(repos: IRepos[]) {
  const languages = {} as {
    [key: string]: number;
  };

  repos.forEach((repos) => {
    // Ignore projects that don't have a language property
    if (!repos.language) return;

    if (!languages[repos.language]) languages[repos.language] = 0;

    languages[repos.language]++;
  });

  return languages;
}
