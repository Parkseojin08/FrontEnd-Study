import { useState } from "react";
export default function Add(funs) {
  const [todoTitle, setTodoTitle] = useState("");

  const add = async () => {
    try {
      const response = await fetch("http://localhost:8080/timeLine/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomName: todoTitle,
        }),
      });

      if (response.ok) {
        const result = await response.text();
        alert(result);
        window.location.reload();
      } else {
        alert("다시 확인해주세요.");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="modal-background" onMouseDown={funs.onDown}>
      <div className="modal-wrap" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-title text-4xl font-bold text-center">
          채팅방 추가하기
        </div>
        <br />
        <div>
          <label>
            <span className="modal-names">방 제목</span>
            <input
              type="text"
              id="todo-title"
              onChange={(e) => setTodoTitle(e.target.value)}
            />
          </label>
        </div>
        <button className="butn-add" onClick={() => add()}>
          추가하기
        </button>
      </div>
    </div>
  );
}
