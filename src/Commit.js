import React from "react";

export default function Commit({ commit }) {
  return (
    <div className="commit-frame">
      <h4>{commit.commit.message}</h4>
      <a href="link_to_github_commit">{commit.sha}</a>
    </div>
  );
}
