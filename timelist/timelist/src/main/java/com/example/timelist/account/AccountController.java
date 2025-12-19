package com.example.timelist.account;

import com.example.timelist.account.dto.SignUpDto;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final AccountRepository accountRepository;


    //회원가입
    @PostMapping("/signUp")
    public ResponseEntity<String> signUp(@RequestBody SignUpDto signUpDto) {
        accountService.signUp(signUpDto);
        if (signUpDto.getUserId() == null) {
            return ResponseEntity.ok("아이디를 입력해주세요.");
        } else if (signUpDto.getPassword() == null) {
            return ResponseEntity.ok("패스워드를 입력해주세요.");
        }
        return ResponseEntity.ok("회원가입 성공");
    }

    //로그인
    @GetMapping("/signIn")
    public ResponseEntity<String> signIn(
            @RequestParam String userId,
            @RequestParam String password,
            HttpServletRequest http
    ) {
        Account account = accountRepository.findByUserIdAndPassword(userId, password);
        if (account == null) {
            return ResponseEntity.ok("일치하는 정보가 없습니다.");
        }
        HttpSession session = http.getSession(true);
        session.setAttribute("accountKey", account.getAccountKey());
        session.setAttribute("username", account.getUserId());
        return ResponseEntity.ok("로그인 성공");

    }
    // 로그아웃 ( 이부분에 대해 좀더 공부할 필요 있음)
    @GetMapping("/signOut")
    public  ResponseEntity<String> signOut(HttpServletResponse response, HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        Cookie cookie = new Cookie("userName", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok("로그아웃 성공");
    }
    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(401).body("로그인 필요");

        Object accountKey = session.getAttribute("accountKey");
        Object username = session.getAttribute("username");

        return ResponseEntity.ok(Map.of(
                "username", username,
                "accountKey", accountKey
        ));
    }


}
