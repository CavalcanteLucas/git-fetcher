import { useState } from "react";
import BranchList from "./BranchList";

export default function Repo({ repo, username }) {
  const initialState = {
    showBranches: false,
  };

  const [showBranches, setShowBranches] = useState(initialState.showBranches);


  function handleShowBranches(e) {
    setShowBranches(!showBranches);
  }

  const btnRotatedCls = 'repo-btn' + (showBranches ? ' btn-rotated' : '');

  return (
    <>
      <div className="repo-title">
        <h2>{repo.name.toUpperCase()}</h2>
        <button className={btnRotatedCls} onClick={handleShowBranches}>
          ›
        </button>
      </div>

      {showBranches ? (
        <BranchList reponame={repo.name} username={username} />
      ) : null}
    </>
  );
}
