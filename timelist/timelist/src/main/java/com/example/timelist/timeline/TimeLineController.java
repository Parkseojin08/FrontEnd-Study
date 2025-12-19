package com.example.timelist.timeline;

import com.example.timelist.timeline.dto.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/timeLine")
@RequiredArgsConstructor
public class TimeLineController {

    private final TimeLineService timeLineService;
    private final  TimeLineRepository timeLineRepository;

    @PostMapping("/post")
    public ResponseEntity<String> addTimeLine(@RequestBody TimeLineAddDto timeLineAddDto) {
        timeLineService.addTimeLine(timeLineAddDto);
        return ResponseEntity.ok("등록되었습니다.");
    }

    @GetMapping("/list")
    public List<TimeLine> findAllByAccountKey(findListDto findListDto) {
        return timeLineService.findAllByAccountKey(findListDto);
    }

    @GetMapping("/percent")
    public int result(DayFindDto dayFind) {
        return timeLineService.result(dayFind);
    }

    @GetMapping("/comingSoon")
    public long dDay(DDayDto dDayDto) {
        return timeLineService.dDay(dDayDto);
    }

    @GetMapping("/comingEnd")
    public long comingEnd(ComingEndDto comingEndDto) {
        return timeLineService.comingEnd(comingEndDto);
    }

    @DeleteMapping("/delete")
    @Transactional
    public ResponseEntity<String> delete(@RequestParam("timeLinesKey") long timeLinesKey)  {
        timeLineService.removeTimeLine(timeLinesKey);
        return ResponseEntity.ok("삭제되었습니다.");
    }


}
