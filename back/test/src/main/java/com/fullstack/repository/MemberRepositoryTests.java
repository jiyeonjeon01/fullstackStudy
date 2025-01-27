package com.fullstack.repository;

import com.fullstack.domain.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepositoryTests extends JpaRepository<Member, String> {

    @EntityGraph(attributePaths = { "memberRoleList" })
    @Query("select m from Member m where m.email = :email")
    Member getWithRoles(@Param("email") String email);
}
