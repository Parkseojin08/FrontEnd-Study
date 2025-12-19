package com.example.timelist.timeline;

import com.example.timelist.account.Account;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "timelines")
public class TimeLine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long timelinesKey;

    @JoinColumn(name = "account_key")
    @ManyToOne(fetch = FetchType.LAZY)
    private Account account;

    private String title;
    private String subTitle;

    @Temporal(TemporalType.DATE)
    private LocalDate startDay;

    @Temporal(TemporalType.DATE)
    private LocalDate endDay;
}
