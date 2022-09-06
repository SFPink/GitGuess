import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// NOTE:: This is optional but will help with throttling.
const { VITE_GITHUB_ACCESS_TOKEN } = import.meta.env;
if (VITE_GITHUB_ACCESS_TOKEN)
  axios.defaults.headers["Authorization"] = `token ${VITE_GITHUB_ACCESS_TOKEN}`;

export interface IProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  repos_url: string;
  public_repos: number;
}

export interface IRepos {
  language: string;
  languages_url?: string;
}

export interface ILanguage {
  [key: string]: number;
}

const ProfileContext = React.createContext(null);

function ProfileContextProvider({ children }) {
  const [username, setUsername] = useState<string | null>(null);
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [repos, setRepos] = useState<IRepos[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username && username.trim()) {
      setLoading(true);
      setError(null);

      // Retrieve user information
      axios
        .get(`https://api.github.com/users/${username}`)
        .then(({ data }) => {
          setProfile(data as IProfile);
          // Reset data when a new user has been entered
          setRepos([]);
        })
        .catch(({ response }) => {
          // Fortunately with React 18 batch updates these all fire together but should consider using a reducer
          setLoading(false);
          setError(response.data.message);
          setProfile(null);
          setRepos([]);
        });
    }
  }, [username]);

  useEffect(() => {
    if (profile) {
      const limit = 100;
      // Calculate page count
      const pages = Math.ceil(profile.public_repos / limit);

      // Create list of APIs to call
      const apiCalls = Array.from(
        { length: pages },
        (v, page) => `${profile.repos_url}?per_page=${limit}&page=${page + 1}`
      );

      // Call all APIs together before doing anything else
      Promise.all(apiCalls.map((api) => axios.get(api))).then((response) => {
        // Flatten data
        const output = response.reduce((acc, { data }) => acc.concat(data), []);
        setRepos(output as IRepos[]);
        setLoading(false);
      });
    }
  }, [profile]);

  return (
    <ProfileContext.Provider
      value={{ profile, repos, loading, error, setUsername }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

function useProfile(): {
  profile?: IProfile;
  repos: IRepos[];
  loading: boolean | null | undefined;
  error: string | null;
  setUsername: Function;
} {
  const context = useContext(ProfileContext);

  if (context === undefined) {
    throw new Error("useApp must be used within App Provider");
  }

  return context;
}

export { ProfileContextProvider, ProfileContext, useProfile };
