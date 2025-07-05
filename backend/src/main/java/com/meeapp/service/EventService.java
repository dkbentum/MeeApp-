package com.meeapp.service;

import com.meeapp.dto.EventDto;
import com.meeapp.entity.*;
import com.meeapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Page<Event> getUpcomingPublicEvents(Pageable pageable) {
        return eventRepository.findUpcomingPublicEvents(LocalDateTime.now(), pageable);
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public Event createEvent(EventDto eventDto, Long organizerId) {
        User organizer = userRepository.findById(organizerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Event event = new Event();
        event.setTitle(eventDto.getTitle());
        event.setDescription(eventDto.getDescription());
        event.setStartDateTime(eventDto.getStartDateTime());
        event.setEndDateTime(eventDto.getEndDateTime());
        event.setLocation(eventDto.getLocation());
        event.setImageUrl(eventDto.getImageUrl());
        event.setMaxAttendees(eventDto.getMaxAttendees());
        event.setIsPublic(eventDto.getIsPublic());
        event.setOrganizer(organizer);

        if (eventDto.getGroupId() != null) {
            Group group = groupRepository.findById(eventDto.getGroupId())
                    .orElseThrow(() -> new RuntimeException("Group not found"));
            event.setGroup(group);
        }

        if (eventDto.getCategoryIds() != null && !eventDto.getCategoryIds().isEmpty()) {
            Set<Category> categories = eventDto.getCategoryIds().stream()
                    .map(categoryId -> categoryRepository.findById(categoryId)
                            .orElseThrow(() -> new RuntimeException("Category not found")))
                    .collect(Collectors.toSet());
            event.setCategories(categories);
        }

        return eventRepository.save(event);
    }

    public Event updateEvent(Long eventId, EventDto eventDto, Long userId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (!event.getOrganizer().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to update this event");
        }

        event.setTitle(eventDto.getTitle());
        event.setDescription(eventDto.getDescription());
        event.setStartDateTime(eventDto.getStartDateTime());
        event.setEndDateTime(eventDto.getEndDateTime());
        event.setLocation(eventDto.getLocation());
        event.setImageUrl(eventDto.getImageUrl());
        event.setMaxAttendees(eventDto.getMaxAttendees());
        event.setIsPublic(eventDto.getIsPublic());

        return eventRepository.save(event);
    }

    public void deleteEvent(Long eventId, Long userId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (!event.getOrganizer().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this event");
        }

        event.setIsActive(false);
        eventRepository.save(event);
    }

    public EventAttendee attendEvent(Long eventId, Long userId, EventAttendee.AttendanceStatus status) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if user is already attending
        EventAttendee existingAttendee = event.getAttendees().stream()
                .filter(attendee -> attendee.getUser().getId().equals(userId))
                .findFirst()
                .orElse(null);

        if (existingAttendee != null) {
            existingAttendee.setStatus(status);
            return existingAttendee;
        }

        EventAttendee attendee = new EventAttendee(event, user, status);
        event.getAttendees().add(attendee);
        eventRepository.save(event);

        return attendee;
    }

    public void unattendEvent(Long eventId, Long userId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        event.getAttendees().removeIf(attendee -> attendee.getUser().getId().equals(userId));
        eventRepository.save(event);
    }

    public List<Event> searchEvents(String query) {
        return eventRepository.searchEvents(query);
    }

    public List<Event> getUserEvents(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return eventRepository.findByOrganizer(user);
    }

    public List<Event> getUserAttendingEvents(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return eventRepository.findUserAttendingEvents(user);
    }
}