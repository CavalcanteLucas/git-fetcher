import React from "react";

export default function Commit({ commit, username, reponame }) {
  const commitUrl = `https://github.com/${username}/${reponame}/commit/${commit.sha}`;

  return (
    <div className="commit-frame">
      <h4> </h4>• <span>{commit.commit.message}</span> (
      <a href={commitUrl}>
        <strong>{commit.sha.substring(1, 9)}</strong>
      </a>
      )
    </div>
  );
}
