import { useState, useRef } from "react";
import RepoList from "./RepoList";
import "./App.scss";

function App() {
  const [username, setUsername] = useState(null);

  const usernameRef = useRef();

  const handleSearchUser = (e) => {
    const username = usernameRef.current.value;
    if (username === "") return;
    setUsername(username);
    usernameRef.current.value = null;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchUser();
    }
  };

  return (
    <>
      <div className="header-frame">
        <input
          ref={usernameRef}
          type="text"
          placeholder="username"
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="app-frame">
        {username ? (
          <RepoList username={username} />
        ) : (
          <div className="app-main-msg-frame">
            <h1>Welcome,</h1>
            <h1>this is the Git Fetcher.</h1>
            <h1>Type a valid git user to start!</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
