import { useState, useEffect } from "react";
import Commit from "./Commit";
import axios from "axios";
import paginationSetup from "./utils/paginationSetup";

export default function CommitList({ branchname, username, reponame }) {
  const [commits, setCommits] = useState([]);
  const [isLoadingCommits, setIsLoadingCommits] = useState(false);
  const [errCommits, setErrCommits] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const getCommits = () => {
    setCommits([]);
    setIsLoadingCommits(true);
    setErrCommits("");
    axios
      .get(
        `https://api.github.com/repos/${username}/${reponame}/commits?sha=${branchname}&per_page=10&page=${currentPage}`,
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GIT_TOKEN}`,
          },
        }
      )
      .then((response) => {
        setCommits(response.data);
        setErrCommits("");

        const headerLink = response.headers.link;
        if (headerLink) {
          const lastPage = paginationSetup(headerLink);
          if (lastPage) {
            setLastPage(parseInt(lastPage));
          }
        }
      })
      .catch((error) => {
        setErrCommits(error.message);
      })
      .finally(() => {
        setIsLoadingCommits(false);
      });
  };

  const handlerNextPgBtn = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlerPrevPgBtn = () => {
    setCurrentPage(currentPage - 1);
  };

  const isFirstPage = () => {
    return currentPage === 1;
  };

  const isLastPage = () => {
    return lastPage && currentPage === lastPage;
  };

  useEffect(getCommits, [branchname, currentPage, reponame, username]);

  if (commits)
    return (
      <>
        {!errCommits && !isLoadingCommits ? (
          <>
            <div className="commit-list-pg-btn-frame">
              <button
                disabled={isFirstPage()}
                onClick={() => {
                  handlerPrevPgBtn();
                }}
              >
                ⬅
              </button>
              <p>
                {currentPage} | {lastPage}
              </p>
              <button
                disabled={isLastPage()}
                onClick={() => {
                  handlerNextPgBtn();
                }}
              >
                ➡
              </button>
            </div>
            <div className="commit-list-frame">
              {commits.map((commit) => {
                return (
                  <Commit
                    key={commit.sha}
                    commit={commit}
                    username={username}
                    reponame={reponame}
                  ></Commit>
                );
              })}
            </div>
          </>
        ) : (
          <div className="">
            {errCommits && <h2>{errCommits}</h2>}
            {isLoadingCommits && (
              <span className="loading-frame">
                <div className="loading-spinner-frame">
                  <div className="loader"></div>
                </div>

                <p>Loading...</p>
              </span>
            )}
          </div>
        )}
        {}
      </>
    );
  else return null;
}
