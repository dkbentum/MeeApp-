package com.meeapp.controller;

import com.meeapp.dto.EventDto;
import com.meeapp.entity.Event;
import com.meeapp.entity.EventAttendee;
import com.meeapp.security.UserPrincipal;
import com.meeapp.service.EventService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/public")
    public ResponseEntity<Page<Event>> getPublicEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Event> events = eventService.getUpcomingPublicEvents(pageable);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEvent(@PathVariable Long id) {
        Event event = eventService.getEventById(id);
        return ResponseEntity.ok(event);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Event> createEvent(
            @Valid @RequestBody EventDto eventDto,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Event event = eventService.createEvent(eventDto, userPrincipal.getId());
        return ResponseEntity.ok(event);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Event> updateEvent(
            @PathVariable Long id,
            @Valid @RequestBody EventDto eventDto,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Event event = eventService.updateEvent(id, eventDto, userPrincipal.getId());
        return ResponseEntity.ok(event);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteEvent(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        eventService.deleteEvent(id, userPrincipal.getId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/attend")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<EventAttendee> attendEvent(
            @PathVariable Long id,
            @RequestParam(defaultValue = "GOING") EventAttendee.AttendanceStatus status,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        EventAttendee attendee = eventService.attendEvent(id, userPrincipal.getId(), status);
        return ResponseEntity.ok(attendee);
    }

    @DeleteMapping("/{id}/attend")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> unattendEvent(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        eventService.unattendEvent(id, userPrincipal.getId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Event>> searchEvents(@RequestParam String query) {
        List<Event> events = eventService.searchEvents(query);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/my-events")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Event>> getMyEvents(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<Event> events = eventService.getUserEvents(userPrincipal.getId());
        return ResponseEntity.ok(events);
    }

    @GetMapping("/attending")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Event>> getAttendingEvents(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<Event> events = eventService.getUserAttendingEvents(userPrincipal.getId());
        return ResponseEntity.ok(events);
    }
}