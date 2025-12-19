import { useState } from "react";
import "./rmandud.css";
export default function RemoveAndUpdate(funs) {
  const modals = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const response = await fetch(
        `http://localhost:8080/timeLine/delete?timeLinesKey=${funs.nowKeys}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const result = await response.text();
      alert(result);
    }
  };
  return (
    <div className="modal-background" onMouseDown={funs.onDown}>
      <div className="modal-wrap" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-title text-4xl font-bold text-center">
          {funs.title}
        </div>
        <button className="butn-update" onClick={() => add()}>
          수정하기
        </button>
        <button className="butn-remove" onClick={() => modals()}>
          삭제하기
        </button>
      </div>
    </div>
  );
}
