package com.fullstack.dto;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class MemberDTO extends User {

    private String email;
    private String pw;
    private String nickname;
    private boolean social;
    private List<String> roleNames;

    public MemberDTO(String email, String pw, String nickname, boolean social, List<String> roleNames) {
        super(
                email,
                pw,
                roleNames.stream()
                        .map(str -> new SimpleGrantedAuthority("ROLE_" + str))
                        .collect(Collectors.toList()));

        this.email = email;
        this.pw = pw;
        this.nickname = nickname;
        this.social = social;
        this.roleNames = roleNames;
    }
}
