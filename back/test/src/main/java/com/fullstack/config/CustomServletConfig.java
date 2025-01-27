package com.fullstack.config;

import org.springframework.format.FormatterRegistry;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fullstack.controller.LocalDateFormatter;

public class CustomServletConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(@NonNull FormatterRegistry registry) {
        registry.addFormatter(new LocalDateFormatter());
    }

}
