package com.meeapp.repository;

import com.meeapp.entity.Group;
import com.meeapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    List<Group> findByIsActiveTrue();
    List<Group> findByIsActiveTrueAndIsPublicTrue();
    List<Group> findByCreator(User creator);
    
    @Query("SELECT g FROM Group g WHERE g.isActive = true AND " +
           "(LOWER(g.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(g.description) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Group> searchGroups(@Param("query") String query);
    
    @Query("SELECT g FROM Group g JOIN g.members m WHERE m.user = :user AND g.isActive = true")
    List<Group> findUserGroups(@Param("user") User user);
}