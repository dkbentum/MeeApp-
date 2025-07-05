package com.meeapp.service;

import com.meeapp.dto.MessageDto;
import com.meeapp.entity.Conversation;
import com.meeapp.entity.Message;
import com.meeapp.entity.User;
import com.meeapp.repository.ConversationRepository;
import com.meeapp.repository.MessageRepository;
import com.meeapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private UserRepository userRepository;

    public Message sendMessage(MessageDto messageDto, Long senderId) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        User receiver = userRepository.findById(messageDto.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        // Find or create conversation
        Conversation conversation = conversationRepository.findByUsers(sender, receiver)
                .orElseGet(() -> {
                    Conversation newConversation = new Conversation(sender, receiver);
                    return conversationRepository.save(newConversation);
                });

        Message message = new Message();
        message.setContent(messageDto.getContent());
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setConversation(conversation);

        return messageRepository.save(message);
    }

    public List<Conversation> getUserConversations(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return conversationRepository.findUserConversations(user);
    }

    public List<Message> getConversationMessages(Long conversationId, Long userId) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        // Verify user is part of the conversation
        if (!conversation.getUser1().getId().equals(userId) && 
            !conversation.getUser2().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to view this conversation");
        }

        return messageRepository.findByConversationOrderBySentAtAsc(conversation);
    }

    public List<Message> getUnreadMessages(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return messageRepository.findUnreadMessages(user);
    }

    public Long getUnreadMessageCount(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return messageRepository.countUnreadMessages(user);
    }

    public void markMessageAsRead(Long messageId, Long userId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        if (!message.getReceiver().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to mark this message as read");
        }

        message.setIsRead(true);
        messageRepository.save(message);
    }
}