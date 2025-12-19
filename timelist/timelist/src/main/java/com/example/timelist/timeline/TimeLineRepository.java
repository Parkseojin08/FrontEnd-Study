package com.example.timelist.timeline;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeLineRepository extends JpaRepository<TimeLine, Long> {
    List<TimeLine> findByAccount_AccountKey(Long accountKey);

    void deleteByTimelinesKey(Long timelinesKey);

    List<TimeLine> findAllByTimelinesKey(Long timelinesKey);
}
