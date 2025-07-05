package com.meeapp.controller;

import com.meeapp.dto.MessageDto;
import com.meeapp.entity.Conversation;
import com.meeapp.entity.Message;
import com.meeapp.security.UserPrincipal;
import com.meeapp.service.MessageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/messages")
@PreAuthorize("hasRole('USER')")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping
    public ResponseEntity<Message> sendMessage(
            @Valid @RequestBody MessageDto messageDto,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Message message = messageService.sendMessage(messageDto, userPrincipal.getId());
        return ResponseEntity.ok(message);
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<Conversation>> getConversations(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<Conversation> conversations = messageService.getUserConversations(userPrincipal.getId());
        return ResponseEntity.ok(conversations);
    }

    @GetMapping("/conversations/{conversationId}")
    public ResponseEntity<List<Message>> getConversationMessages(
            @PathVariable Long conversationId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<Message> messages = messageService.getConversationMessages(conversationId, userPrincipal.getId());
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/unread")
    public ResponseEntity<List<Message>> getUnreadMessages(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<Message> messages = messageService.getUnreadMessages(userPrincipal.getId());
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/unread/count")
    public ResponseEntity<Long> getUnreadMessageCount(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Long count = messageService.getUnreadMessageCount(userPrincipal.getId());
        return ResponseEntity.ok(count);
    }

    @PutMapping("/{messageId}/read")
    public ResponseEntity<?> markMessageAsRead(
            @PathVariable Long messageId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        messageService.markMessageAsRead(messageId, userPrincipal.getId());
        return ResponseEntity.ok().build();
    }
}