import { useState, useEffect } from "react";
import Commit from "./Commit";
import axios from "axios";

export default function CommitList({ branchname, username, reponame }) {
  const [commits, setCommits] = useState([]);
  const [isLoadingCommits, setIsLoadingCommits] = useState(false);
  const [errCommits, setErrCommits] = useState("");

  const getCommits = () => {
    setIsLoadingCommits(true);
    setErrCommits("");
    axios
      .get(`https://api.github.com/repos/${username}/${reponame}/commits`, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GIT_TOKEN}`,
        },
      })
      .then((response) => {
        setCommits(response.data);
        setErrCommits("");
      })
      .catch((error) => {
        console.log(error);
        setErrCommits(error.message);
      })
      .finally(() => {
        setIsLoadingCommits(false);
      });
  };

  const mockUpdateCommits = () => {
    let commits = require("./samples/commitsSample.json");
    setCommits(commits);
  };

  useEffect(getCommits, [reponame, username]);

  if (!commits) return null;

  return (
    <>
      <div className="commit-list-frame">
        {errCommits && <h4>{errCommits}</h4>}
        {isLoadingCommits && <h4>Loading...</h4>}

        {commits.map((commit) => {
          return <Commit key={commit.sha} commit={commit}></Commit>;
        })}
      </div>
    </>
  );
}
