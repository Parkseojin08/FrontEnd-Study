import { useState, useEffect, use } from "react";
import Add from "./modal/add.jsx";
import RomoveAndUpdate from "./modal/rmandud.jsx";
import "./content.css";

export default function Content() {
  const [nowYear, setNowYear] = useState("2025-12-9"); // 이걸 만들고 있는 날로 기본값을 설정함
  const [userName, setUserName] = useState(""); // 유저 이름
  const [userKey, setUserKey] = useState(""); // 유저 고유값
  const [todoList, setTodo] = useState([]); // 할일 리스트
  const [addTodo, setAddTodo] = useState(null); // 추가하기 모달
  const [percent, setPercent] = useState(0); // 퍼센트 게이지
  const [rmAndUd, setRmAndUd] = useState(null); // 삭제 & 업데이트 모달
  const [nowTodoKey, setNowTodoKey] = useState(0);
  const [nowTodoTitle, setNowTodoTitle] = useState("");

  // 올해 몇퍼 지났는지 보여주는 거
  function getYearProgressPercent(date = new Date()) {
    const year = date.getFullYear();
    // 올해 1월 1일 00:00
    const start = new Date(year, 0, 1);
    // 내년 1월 1일 00:00  (올해의 끝 기준점)
    const next = new Date(year + 1, 0, 1);

    // 1) passed: 올해 시작부터 지금까지 '지나온 시간'
    const passed = date.getTime() - start.getTime();
    // 2) total: 올해 전체 길이(1년이 몇 ms인지)
    const total = next.getTime() - start.getTime();

    // 진행률 계산

    setPercent((passed / total) * 100);
    // 혹시 모를 예외 방지로 0~100 범위로 고정
    return Math.min(100, Math.max(0, percent));
  }
  const passedPercent = async (start, end) => {
    const response = await fetch(
      `http://localhost:8080/timeLine/percent?start_day=${start}&end_day=${end}`
    );
    const result = await response.json();
    return Number(result);
  };
  const dDay = async (start) => {
    const response = await fetch(
      `http://localhost:8080/timeLine/comingSoon?start_day=${start}`
    );
    const result = await response.json();
    return Number(result);
  };
  const comingEnd = async (end) => {
    const response = await fetch(
      `http://localhost:8080/timeLine/comingEnd?end_day=${end}`
    );
    const result = await response.json();
    return result;
  };
  const me = async () => {
    const response = await fetch("http://localhost:8080/account/me", {
      credentials: "include",
    });
    try {
      const result = await response.json();

      setUserName(result.username);
      setUserKey(result.accountKey);
    } catch (e) {
      console.log(e);
    }
  };
  const times = async (accountKey) => {
    const response = await fetch(
      `http://localhost:8080/timeLine/list?accountKey=${accountKey}`
    );
    const result = await response.json();

    const withPercent = await Promise.all(
      result.map(async (todo) => {
        const p = await passedPercent(todo.startDay, todo.endDay);
        const d = await dDay(todo.startDay);
        const a = await comingEnd(todo.endDay);
        return { ...todo, percent: p, DDay: d, comingEnds: a };
      })
    );

    setTodo(withPercent);
  };

  const days = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const now = `${year}년 ${month}월 ${day}일`;

    return now;
  };

  useEffect(() => {
    me();
    getYearProgressPercent();
    times(userKey);
    setNowYear(days());
  }, [userKey]);
  return (
    <>
      {userName && (
        <div className="main">
          <div className="content-top text-center mt-5 border-b-2 pb-5">
            <div className="text-4xl font-bold mb-5">{nowYear}</div>
            <div className="percent-bar rounded-full bg-gray-200 overflow-hidden">
              <div
                className="percent-gauge h-full rounded-full
            bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500
            transition-all duration-300"
                style={{ width: ` ${percent}%` }}
              >
                {percent.toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="content-bottom flex">
            <div className="content-left">
              <div className="content-left-top border-b-2 pt-2">
                <div className="coming-soon text-3xl font-bold mb-5 gugi-regular ml-10">
                  다가오는 일정 :
                </div>
                <ul className="coming-list orbit-regular">
                  {todoList.map((todo, index) => {
                    if (todo.DDay >= 0) {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            setNowTodoKey(todo.timelinesKey);
                            setRmAndUd(1);
                            setNowTodoTitle(todo.title);
                          }}
                          className="cursor-pointer"
                        >
                          {todo.title} | D-{todo.DDay == 0 ? "Day" : todo.DDay}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              <div className="content-left-bottom pt-2">
                <div className="end-coming text-3xl font-bold mb-5 gugi-regular ml-10">
                  끝나가는 일정 :
                </div>
                <ul className="coming-list orbit-regular">
                  {todoList.map((todo, index) => {
                    if (todo.DDay <= 0) {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            setNowTodoKey(todo.timelinesKey);
                            setRmAndUd(1);
                            setNowTodoTitle(todo.title);
                          }}
                          className="cursor-pointer"
                        >
                          {todo.title} | 끝날때 까지 D-
                          {todo.DDay == 0 ? "Day" : todo.comingEnds}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              <div className="btn flex ml-10 mb-5">
                <button
                  className="add rounded-full w-20 h-20"
                  onClick={() => setAddTodo(1)}
                >
                  <div className="plus text-center text-8xl mb-5">+</div>
                </button>
              </div>
            </div>
            <div className="content-right pl-10 pt-10">
              <div className="text-4xl font-bold mb-10">진행중인 일정</div>
              <div className="overflow-y-scroll h-5/6">
                {todoList.map((todo, index) => {
                  if (todo.DDay < 0) {
                    return (
                      <div key={index} className="todos">
                        <div className="text-4xl font-bold">
                          {todo.title}{" "}
                          <span className="sub-title text-base">
                            {todo.subTitle}
                          </span>
                        </div>
                        <div className="percent-bar rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className="percent-gauge h-full rounded-full
                                bg-gradient-to-r longer from-blue-600 to-red-600
                                transition-all duration-300"
                            style={{
                              width: `${todo.percent}%`,
                            }}
                          >
                            {todo.percent}%
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          {addTodo && <Add onDown={() => setAddTodo(null)} accKey={userKey} />}
          {rmAndUd && (
            <RomoveAndUpdate
              nowKeys={nowTodoKey}
              title={nowTodoTitle}
              onDown={() => setRmAndUd(null)}
            />
          )}
        </div>
      )}
    </>
  );
}
