import { useState } from "react";
import CommitList from "./CommitList";

export default function Branch({ branch, username, reponame }) {
  const initialState = {
    showCommits: false,
  };

  const [showCommits, setShowCommits] = useState(initialState.showCommits);

  function handleShowCommits(e) {
    setShowCommits(!showCommits);
  }

  const btnRotatedCls = "branch-btn" + (showCommits ? " btn-rotated-90" : "");

  return (
    <>
      <div className="branch-title">
        <h3>{branch.name}</h3>
        <button className={btnRotatedCls} onClick={handleShowCommits}>
        ➤
        </button>
      </div>
      {showCommits ? (
        <CommitList
          branchname={branch.name}
          username={username}
          reponame={reponame}
        />
      ) : null}
    </>
  );
}
