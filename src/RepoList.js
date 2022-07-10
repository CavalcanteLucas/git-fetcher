import { useState, useEffect } from "react";
import Repo from "./Repo";
import axios from "axios";

export default function RepoList({ username }) {
  const [repos, setRepos] = useState([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [errRepos, setErrRepos] = useState("");

  const getRepos = () => {
    setIsLoadingRepos(true);
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
      })
      .finally(() => {
        setIsLoadingRepos(false);
      });
  };

  const mockUpdateRepos = () => {
    let json = require("./samples/reposSample.json");
    setRepos(json);
  };

  useEffect(mockUpdateRepos, []);

  if (!repos) return null;

  return (
    <>
      <h1>{username.toUpperCase()}</h1>
      {errRepos && <h2>{errRepos}</h2>}
      {isLoadingRepos && <h2>Loading...</h2>}
      {repos.map((repo) => {
        console.log(repo.id);
        return (
          <>
            <Repo key={repo.id} repo={repo} username={username} />
            <hr />
          </>
        );
      })}
    </>
  );
}
