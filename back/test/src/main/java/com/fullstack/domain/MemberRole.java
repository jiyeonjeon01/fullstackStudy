package com.fullstack.domain;

import lombok.Data;

@Data
public class MemberRole {
    private String user;
    private String manager;
    private String admin;

}
