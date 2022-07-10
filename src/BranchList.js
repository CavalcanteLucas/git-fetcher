import { useState, useEffect } from "react";
import Branch from "./Branch";
import axios from "axios";

export default function BranchList({ reponame, username }) {
  const [branches, setBranches] = useState([]);
  const [isLoadingBranches, setIsLoadingBranches] = useState(false);
  const [errBranches, setErrBranches] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const getBranches = () => {
    setBranches([]);
    setIsLoadingBranches(true);
    setErrBranches("");
    axios
      .get(
        `https://api.github.com/repos/${username}/${reponame}/branches?per_page=10&page=${currentPage}`,
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GIT_TOKEN}`,
          },
        }
      )
      .then((response) => {
        setBranches(response.data);
        setErrBranches("");
      })
      .catch((error) => {
        setErrBranches(error.message);
      })
      .finally(() => {
        setIsLoadingBranches(false);
      });
  };

  useEffect(getBranches, [currentPage, reponame, username]);

  if (!branches) return null;

  return (
    <>
      {errBranches && <h3>{errBranches}</h3>}
      {isLoadingBranches && <h3>Loading...</h3>}
      {
        <div className="branch-list-pg-btn-frame">
          <button>⬅</button>
          <h3>
            {currentPage} | {lastPage}
          </h3>
          <button>➡</button>
        </div>
      }
      <div className="branch-list-frame">
        {branches.map((branch) => {
          return (
            <Branch
              key={branch.commit.sha}
              branch={branch}
              username={username}
              reponame={reponame}
            ></Branch>
          );
        })}
      </div>
    </>
  );
}
