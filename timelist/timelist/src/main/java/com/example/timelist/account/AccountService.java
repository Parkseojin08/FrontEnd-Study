package com.example.timelist.account;

import com.example.timelist.account.dto.SignInDto;
import com.example.timelist.account.dto.SignUpDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AccountService {
    private final AccountRepository accountRepository;

    //회원가입
    public void signUp( SignUpDto signUpDto) {
        Account account = new Account();
        account.setUsername(signUpDto.getUsername());
        account.setUserId(signUpDto.getUserId());
        account.setPassword(signUpDto.getPassword());

        accountRepository.save(account);
    }

    //로그인
    public Account signIn(SignInDto signInDto) {
        return accountRepository.findByUserIdAndPassword(signInDto.getUserId(), signInDto.getPassword());
    }


}
