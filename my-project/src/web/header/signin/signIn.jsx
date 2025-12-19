import { useState } from "react";
import "./login.css";

export default function SignIn() {
  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");

  const signIn = async () => {
    const response = await fetch(
      `http://localhost:8080/account/signIn?userId=${encodeURIComponent(
        userId
      )}&password=${encodeURIComponent(userPass)}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await response.text();
    alert(result);
    window.location.href = "/";
  };

  return (
    <div className="flex justify-center">
      <div className="signIn-wrap border-2 p-10 m-72">
        <h1 className="text-5xl font-bold text-center ">sign in</h1>
        <div>
          <label>
            <span className="input-title text-xl">아이디 </span>
            <input
              type="text"
              className="mb-5 "
              id="user-id"
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              value={userId}
            />
          </label>
        </div>
        <div>
          <label>
            <span className="input-title text-xl ">비밀번호 </span>
            <input
              type="password"
              id="user-pass"
              onChange={(e) => {
                setUserPass(e.target.value);
              }}
              value={userPass}
            />
          </label>
        </div>
        <button
          id="butn"
          onClick={() => {
            signIn();
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
