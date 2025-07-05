package com.meeapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class MessageDto {
    @NotBlank
    @Size(max = 1000)
    private String content;

    @NotNull
    private Long receiverId;

    public MessageDto() {}

    public MessageDto(String content, Long receiverId) {
        this.content = content;
        this.receiverId = receiverId;
    }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public Long getReceiverId() { return receiverId; }
    public void setReceiverId(Long receiverId) { this.receiverId = receiverId; }
}