package com.fullstack.controller;

import org.springframework.lang.NonNull;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import org.springframework.format.Formatter;

public class LocalDateFormatter implements Formatter<LocalDate> {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Override
    public @NonNull LocalDate parse(@NonNull String text, @NonNull Locale locale) {
        return LocalDate.parse(text, formatter);
    }

    @Override
    public @NonNull String print(@NonNull LocalDate object, @NonNull Locale locale) {
        return formatter.format(object);
    }

}