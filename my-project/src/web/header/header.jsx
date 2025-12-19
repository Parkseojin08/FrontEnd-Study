import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [userName, setUserName] = useState("");
  const me = async () => {
    const response = await fetch("http://localhost:8080/account/me", {
      credentials: "include",
    });
    try {
      const result = await response.json();

      setUserName(result.username);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    me();
  }, []);

  const logout = async () => {
    const response = await fetch("http://localhost:8080/account/signOut", {
      credentials: "include",
    });
    const result = await response.text();
    alert(result);
    window.location.reload();
    window.location.href = "/";
  };
  return (
    <div className="header flex justify-between pl-10 pr-10 pt-6 pb-5 items-end  bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <Link to="/" className="header-title text-6xl ">
        TLW
      </Link>
      <div className="sign-wrap flex justify-around w-64 text-2xl">
        {userName ? (
          <div className="user-name p-1">{userName}</div>
        ) : (
          <Link
            to="/sign-in"
            className="sign-in hover:text-slate-400 hover:bg-green-600 p-1 rounded-md"
          >
            sign in
          </Link>
        )}
        {userName ? (
          <div
            className="sign-out cursor-pointer hover:bg-green-600 p-1 rounded-md"
            onClick={() => logout()}
          >
            sign out
          </div>
        ) : (
          <Link
            to="/sign-up"
            className="sign-up hover:bg-green-600 p-1 rounded-md"
          >
            sign up
          </Link>
        )}
      </div>
    </div>
  );
}
