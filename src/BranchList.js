import { useState, useEffect } from "react";
import Branch from "./Branch";
import axios from "axios";

export default function BranchList({ reponame, username }) {
  const [branches, setBranches] = useState([]);
  const [isLoadingBranches, setIsLoadingBranches] = useState(false);
  const [errBranches, setErrBranches] = useState("");

  const getBranches = () => {
    setIsLoadingBranches(true);
    axios
      .get(`https://api.github.com/repos/${username}/${reponame}/branches`, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GIT_TOKEN}`,
        },
      })
      .then((response) => {
        setBranches(response.data);
        setErrBranches("");
      })
      .catch((error) => {
        console.log(error);
        setErrBranches(error.message);
      })
      .finally(() => {
        setIsLoadingBranches(false);
      });
  };

  const mockUpdateBranches = () => {
    let branches = require("./samples/branchesSample.json");
    setBranches(branches);
  };

  useEffect(mockUpdateBranches, []);

  if (!branches) return null;

  return (
    <>
      {errBranches && <h3>{errBranches}</h3>}
      {isLoadingBranches && <h3>Loading...</h3>}
      {branches.map((branch) => {
        return (
          <Branch
            key={branch.commit}
            branch={branch}
            username={username}
            reponame={reponame}
          ></Branch>
        );
      })}
    </>
  );
}
