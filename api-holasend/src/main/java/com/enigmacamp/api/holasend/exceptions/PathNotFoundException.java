package com.enigmacamp.api.holasend.exceptions;

import org.springframework.http.HttpStatus;

public class PathNotFoundException extends ApplicationException {

    public PathNotFoundException() {
        super(HttpStatus.NOT_FOUND, "error." + HttpStatus.NOT_FOUND.value() + ".path");
    }
}