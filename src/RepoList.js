import { useState, useEffect } from "react";
import Repo from "./Repo";
import axios from "axios";

export default function RepoList({ username }) {
  const [repos, setRepos] = useState([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [errRepos, setErrRepos] = useState("");

  const getRepos = () => {
    setIsLoadingRepos(true);
    setErrRepos("");
    axios
      .get(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GIT_TOKEN}`,
        },
      })
      .then((response) => {
        setRepos(response.data);
        setErrRepos("");
      })
      .catch((error) => {
        console.log(error);
        setErrRepos(error.message);
        setRepos([]);
      })
      .finally(() => {
        setIsLoadingRepos(false);
      });
  };

  const mockUpdateRepos = () => {
    let json = require("./samples/reposSample.json");
    setRepos(json);
  };

  useEffect(getRepos, [username]);

  if (repos)
    return (
      <>
        <h1>{username.toUpperCase()}</h1>
        {errRepos && <h2>{errRepos}</h2>}
        {isLoadingRepos && <h2>Loading...</h2>}
        {repos.map((repo) => {
          return <Repo key={repo.id} repo={repo} username={username} />;
        })}
      </>
    );
  else return null;
}
