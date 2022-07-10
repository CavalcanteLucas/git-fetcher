import { useState, useRef } from "react";
import RepoList from "./RepoList";
import "./App.scss";


function App() {
  const [username, setUsername] = useState(null);

  const usernameRef = useRef();

  function handleSearchUser(e) {
    const username = usernameRef.current.value;
    if (username === "") return;
    setUsername(username);
    usernameRef.current.value = null;
  }

  return (
    <>
      <input ref={usernameRef} type="text" />
      <button onClick={handleSearchUser}>Search</button>

      {username ? <RepoList username={username} /> : null}
    </>
  );
}

export default App;
