package com.example.timelist.timeline;

import com.example.timelist.account.Account;
import com.example.timelist.account.AccountRepository;
import com.example.timelist.timeline.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TimeLineService {
    private final TimeLineRepository timeLineRepository;
    private final AccountRepository accountRepository;

    //할일 저장히기
    public void addTimeLine(TimeLineAddDto timeLineAddDto) {
        Account account = accountRepository.findById(timeLineAddDto.getAccountKey())
                .orElseThrow(()-> new IllegalArgumentException("존재하지 않는 계정입니다."));
        TimeLine timeLine = new TimeLine();
        timeLine.setAccount(account);
        timeLine.setTitle(timeLineAddDto.getTitle());
        timeLine.setSubTitle(timeLineAddDto.getSubTitle());
        timeLine.setStartDay(timeLineAddDto.getStartDay());
        System.out.println(timeLineAddDto.getStartDay());
        timeLine.setEndDay(timeLineAddDto.getEndDay() == null ? timeLineAddDto.getStartDay() : timeLineAddDto.getEndDay());

        timeLineRepository.save(timeLine);
    }

    // 할일 조회하기
    public List<TimeLine> findAllByAccountKey(findListDto findListDto) {
        return timeLineRepository.findByAccount_AccountKey(findListDto.getAccountKey());
    }
    //  날짜 계산하기
    public int result(DayFindDto dayFind ) {
        LocalDate start_day = dayFind.getStart_day();
        LocalDate end_day = (dayFind.getEnd_day() == null) ? start_day : dayFind.getEnd_day();
        LocalDate today = LocalDate.now();

        long days = ChronoUnit.DAYS.between(start_day, end_day);
        long passed = ChronoUnit.DAYS.between(start_day, today);
        double passed_days = (double) passed / (double) days;
        int percent =  (int) Math.round(passed_days * 100);

        return Math.max(0,Math.min(100,percent));
    }
    // 이벤트 시작 날짜까지 얼마나 남았는지
    public long dDay (DDayDto dDayDto) {
        LocalDate now = LocalDate.now();
        LocalDate start_day = dDayDto.getStart_day();

        long passed = ChronoUnit.DAYS.between(now, start_day);

        return passed;
    }
    // 이미 진행 중이면 끝날때까지 얼마나 남았는지
    public long comingEnd(ComingEndDto comingEndDto) {
        LocalDate now = LocalDate.now();
        LocalDate end = comingEndDto.getEnd_day();
        return ChronoUnit.DAYS.between(now, end);
    }

    public void removeTimeLine(long timeLinesKey) {
        timeLineRepository.deleteByTimelinesKey(timeLinesKey);
    }
}
