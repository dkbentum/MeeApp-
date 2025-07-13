package com.meeapp.repository;

import com.meeapp.entity.Event;
import com.meeapp.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByIsActiveTrue();
    List<Event> findByIsActiveTrueAndIsPublicTrue();
    List<Event> findByOrganizer(User organizer);
    
    @Query("SELECT e FROM Event e WHERE e.isActive = true AND e.isPublic = true AND " +
           "e.startDateTime >= :now ORDER BY e.startDateTime ASC")
    Page<Event> findUpcomingPublicEvents(@Param("now") LocalDateTime now, Pageable pageable);
    
    @Query("SELECT e FROM Event e WHERE e.isActive = true AND " +
           "(LOWER(e.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.description) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Event> searchEvents(@Param("query") String query);
    
    @Query("SELECT e FROM Event e JOIN e.attendees a WHERE a.user = :user AND " +
           "a.status = 'GOING' AND e.isActive = true")
    List<Event> findUserAttendingEvents(@Param("user") User user);
}