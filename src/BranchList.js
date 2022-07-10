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

        const headerLink = response.headers.link;

        if (headerLink) {
          const paginationLinks = headerLink.split(", ");

          paginationLinks.map((paginationLink) => {
            console.log(paginationLink);

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
        setErrBranches(error.message);
      })
      .finally(() => {
        setIsLoadingBranches(false);
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

  useEffect(getBranches, [currentPage, reponame, username]);

  if (branches)
    return (
      <>
        {!errBranches && !isLoadingBranches ? (
          <>
            <div className="branch-list-pg-btn-frame">
              <button
                disabled={isFirstPage()}
                onClick={() => {
                  handlerPrevPgBtn();
                }}
              >
                ⬅
              </button>
              <h3>
                {currentPage} | {lastPage}
              </h3>
              <button
                disabled={isLastPage()}
                onClick={() => {
                  handlerNextPgBtn();
                }}
              >
                ➡
              </button>
            </div>
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
        ) : (
          <div className="branch-list-pg-btn-frame ">
            {errBranches && <h3>{errBranches}</h3>}
            {isLoadingBranches && (
              <span className="loading-frame branch-list-pg-loading-frame">
                <div className="loading-spinner-frame">
                  <div className="loader"></div>
                </div>

                <h3>Loading...</h3>
              </span>
            )}
          </div>
        )}
      </>
    );
  else return null;
}
