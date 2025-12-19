import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./header.css";

export default function Header() {
  const [userName, setUserName] = useState("");
  const me = async () => {
    try {
      const response = await fetch("http://localhost:8080/account/me", {
        credentials: "include",
      });

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
    <div className="header flex justify-between pl-10 pr-10 pt-6 pb-5 items-end ">
      <Link to="/" className="header-title text-6xl ">
        TLW
      </Link>
      <div className="sign-wrap flex justify-around w-64 text-2xl">
        {<>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-user-icon lucide-user"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          {userName}
        </> ? (
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
