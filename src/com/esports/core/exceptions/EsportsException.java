package com.esports.core.exceptions;

public abstract class EsportsException extends RuntimeException {
    private final String errorCode;

    public EsportsException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}

class EntityNotFoundException extends EsportsException {
    public EntityNotFoundException(String entity, String id) {
        super(entity + " with ID " + id + " not found.", "ERR_NOT_FOUND");
    }
}

class ValidationException extends EsportsException {
    public ValidationException(String message) {
        super(message, "ERR_VALIDATION");
    }
}
