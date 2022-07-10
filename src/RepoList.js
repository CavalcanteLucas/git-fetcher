import { useState, useEffect } from "react";
import Repo from "./Repo";
import axios from "axios";

export default function RepoList({ username }) {
  const [repos, setRepos] = useState([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [errRepos, setErrRepos] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const getRepos = () => {
    setRepos([]);
    setIsLoadingRepos(true);
    setErrRepos("");
    axios
      .get(
        `https://api.github.com/users/${username}/repos?per_page=10&page=${currentPage}`,
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GIT_TOKEN}`,
          },
        }
      )
      .then((response) => {
        setRepos(response.data);
        setErrRepos("");

        const headerLink = response.headers.link;
        if (headerLink) {
          const paginationLinks = headerLink.split(", ");

          paginationLinks.map((paginationLink) => {
            const paginationURL = paginationLink
              .split("; ")[0]
              .match("<(.*)>")[1];
            const paginationRel = paginationLink
              .split("; ")[1]
              .match('"(.*)"')[1];

            if (paginationRel === "last") {
              const lastPage = paginationURL.match(/&page=(\d+).*$/)[1];
              setLastPage(parseInt(lastPage));
            }

            return null;
          });
        }
      })
      .catch((error) => {
        setErrRepos(error.message);
        setRepos([]);
      })
      .finally(() => {
        setIsLoadingRepos(false);
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
    return currentPage === lastPage;
  };

  useEffect(getRepos, [currentPage, username]);

  if (repos)
    return (
      <>
        <h1>{username.toUpperCase()}</h1>
        {errRepos && <h2>{errRepos}</h2>}
        {isLoadingRepos && <h2>Loading...</h2>}
        {!errRepos && !isLoadingRepos && (
          <div className="repo-list-pg-btn-frame">
            <button
              className={"prev-pg-btn"}
              disabled={isFirstPage()}
              onClick={() => {
                handlerPrevPgBtn();
              }}
            >
              ⬅
            </button>
            <h2>
              {currentPage} | {lastPage}
            </h2>
            <button
              className="next-pg-btn"
              disabled={isLastPage()}
              onClick={() => {
                handlerNextPgBtn();
              }}
            >
              ➡
            </button>
          </div>
        )}
        <div className="repo-list-frame">
          {repos.map((repo) => {
            return <Repo key={repo.id} repo={repo} username={username} />;
          })}
        </div>
      </>
    );
  else return null;
}
