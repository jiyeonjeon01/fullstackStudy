package com.fullstack.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fullstack.domain.Member;
import com.fullstack.domain.MemberRole;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class MemberRepositoryTests {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testInsertMember() {

        for (int i = 0; i < 10; i++) {

            Member member = Member.builder()
                    .email("user" + i + "@aaa.com")
                    .pw(passwordEncoder.encode("1111"))
                    .nickname("USER" + i)
                    .build();

            // MemberRole 객체 생성 및 설정
            MemberRole memberRole = new MemberRole();
            memberRole.setUser("USER");
            member.addRole(memberRole);

            if (i >= 5) {
                memberRole.setManager("MANAGER");
                member.addRole(memberRole);
            }

            if (i >= 8) {
                memberRole.setAdmin("ADMIN");
                member.addRole(memberRole);
            }

            memberRepository.save(member);
        }
    }

    @Test
    public void testRead() {

        String email = "user9@aaa.com";

        Member member = memberRepository.getWithRoles(email);

        log.info("-----------------");
        log.info(member);
    }

}
