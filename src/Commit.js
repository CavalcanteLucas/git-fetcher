import React from "react";

export default function Commit({ commit }) {
  return (
    <div className="commit-frame">
      <h4>{" "}</h4>
      <a href="link_to_github_commit">{commit.commit.message}</a>
    </div>
  );
}
