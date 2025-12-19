import { useState, useEffect } from "react";
import "./content.css";

export default function Content() {
  const [percent, setPercent] = useState(0);
  const [nowYear, setNowYear] = useState(2025); // 이걸 만들고 있는 연도로 기본값을 설정함
  const [userName, setUserName] = useState("");
  const [userKey, setUserKey] = useState("");
  const [todoList, setTodo] = useState([]);
  function getYearProgressPercent(date = new Date()) {
    const year = date.getFullYear();

    setNowYear(year);
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
    console.log(percent);
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
      console.log(result);
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
        if (d < 0) {
          const a = await comingEnd(todo.endDay);
          console.log(a);
          return { ...todo, percent: p, dDay: d, comingEnd: a };
        }

        return { ...todo, percent: p, dDay: d, comingEnd: null };
      })
    );

    setTodo(withPercent);
  };

  useEffect(() => {
    me();
    getYearProgressPercent();
    times(userKey);
  }, [userKey]);
  return (
    <>
      {userName && (
        <div className="main">
          <div className="content-top text-center mt-5 border-b-2 pb-1">
            <div className="text-4xl font-bold">{nowYear}년</div>
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
              <div className="content-left-top">
                <div className="coming-soon text-2xl font-bold mb-5 gugi-regular ml-5">
                  다가오는 일정 :
                </div>
                <ul className="coming-list orbit-regular">
                  {todoList.map((todo, index) => {
                    console.log(todo);
                    if (todo.DDay > 0) {
                      return (
                        <li key={index} className="lis">
                          {todo.title} | D-{todo.DDay}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              <div className="content-left-bottom">
                <div className="end-coming text-2xl font-bold mb-5 gugi-regular ml-5">
                  끝나가는 일정 :
                </div>
                <ul className="coming-list orbit-regular">
                  {todoList.map((todo, index) => {
                    if (todo.DDay <= 0) {
                      return (
                        <li key={index} className="lis">
                          {todo.title} | D-
                          {todo.DDay == 0 ? "Day" : todo.comingEnd}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              <div className="btn flex justify-center">
                <button className="add pt-3 pb-3 pl-5 pr-5">일정추가</button>
              </div>
            </div>
            <div className="content-right pl-10 pt-10">
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
            bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500
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
      )}
    </>
  );
}
