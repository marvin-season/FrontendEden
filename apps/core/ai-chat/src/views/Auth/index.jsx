import { useEffect, useState } from "react";

const Auth = ({ setIsAuthed }) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    setIsAuthed(!!sessionStorage.getItem("token"));
  }, []);

  return <>
    <form onSubmit={e => {
      e.preventDefault();
      if (token === "eden") {
        sessionStorage.setItem("token", token);
        setIsAuthed(true);
      }
    }}>
      <input type="text" value={token} onChange={(e) => {
        setToken(e.target.value);
      }} />
      <button type="submit">登录</button>
    </form>
  </>;
};

export default Auth;