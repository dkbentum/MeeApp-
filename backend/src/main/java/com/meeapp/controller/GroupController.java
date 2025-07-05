package com.meeapp.controller;

import com.meeapp.dto.GroupDto;
import com.meeapp.entity.Group;
import com.meeapp.entity.GroupMember;
import com.meeapp.security.UserPrincipal;
import com.meeapp.service.GroupService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping("/public")
    public ResponseEntity<List<Group>> getPublicGroups() {
        List<Group> groups = groupService.getPublicGroups();
        return ResponseEntity.ok(groups);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Group> getGroup(@PathVariable Long id) {
        Group group = groupService.getGroupById(id);
        return ResponseEntity.ok(group);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Group> createGroup(
            @Valid @RequestBody GroupDto groupDto,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Group group = groupService.createGroup(groupDto, userPrincipal.getId());
        return ResponseEntity.ok(group);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Group> updateGroup(
            @PathVariable Long id,
            @Valid @RequestBody GroupDto groupDto,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Group group = groupService.updateGroup(id, groupDto, userPrincipal.getId());
        return ResponseEntity.ok(group);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteGroup(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        groupService.deleteGroup(id, userPrincipal.getId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/join")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<GroupMember> joinGroup(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        GroupMember member = groupService.joinGroup(id, userPrincipal.getId());
        return ResponseEntity.ok(member);
    }

    @DeleteMapping("/{id}/leave")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> leaveGroup(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        groupService.leaveGroup(id, userPrincipal.getId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Group>> searchGroups(@RequestParam String query) {
        List<Group> groups = groupService.searchGroups(query);
        return ResponseEntity.ok(groups);
    }

    @GetMapping("/my-groups")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Group>> getMyGroups(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<Group> groups = groupService.getUserGroups(userPrincipal.getId());
        return ResponseEntity.ok(groups);
    }
}