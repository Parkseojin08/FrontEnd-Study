import { useState } from "react";
import "./signUp.css";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const signUp = async () => {
    const response = await fetch("http://localhost:8080/account/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        password: userPass,
        username: userName,
      }),
    });
    const result = await response.text();
    alert(result);
  };

  return (
    <div className="flex justify-center">
      <div className="signUp-wrap m-64">
        <h1 className="text-center font-bold">Sign Up</h1>
        <div>
          <label>
            <span className="input-title text-xl">이름 </span>
            <input
              type="text"
              id="user-name"
              className="mb-5 "
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
            />
          </label>
        </div>
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
            signUp();
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
