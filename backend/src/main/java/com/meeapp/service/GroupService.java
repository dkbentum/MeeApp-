package com.meeapp.service;

import com.meeapp.dto.GroupDto;
import com.meeapp.entity.*;
import com.meeapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Group> getPublicGroups() {
        return groupRepository.findByIsActiveTrueAndIsPublicTrue();
    }

    public Group getGroupById(Long id) {
        return groupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));
    }

    public Group createGroup(GroupDto groupDto, Long creatorId) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Group group = new Group();
        group.setName(groupDto.getName());
        group.setDescription(groupDto.getDescription());
        group.setImageUrl(groupDto.getImageUrl());
        group.setIsPublic(groupDto.getIsPublic());
        group.setCreator(creator);

        if (groupDto.getCategoryIds() != null && !groupDto.getCategoryIds().isEmpty()) {
            Set<Category> categories = groupDto.getCategoryIds().stream()
                    .map(categoryId -> categoryRepository.findById(categoryId)
                            .orElseThrow(() -> new RuntimeException("Category not found")))
                    .collect(Collectors.toSet());
            group.setCategories(categories);
        }

        Group savedGroup = groupRepository.save(group);

        // Add creator as admin member
        GroupMember creatorMember = new GroupMember(savedGroup, creator, GroupMember.MemberRole.ADMIN);
        savedGroup.getMembers().add(creatorMember);

        return groupRepository.save(savedGroup);
    }

    public Group updateGroup(Long groupId, GroupDto groupDto, Long userId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        if (!group.getCreator().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to update this group");
        }

        group.setName(groupDto.getName());
        group.setDescription(groupDto.getDescription());
        group.setImageUrl(groupDto.getImageUrl());
        group.setIsPublic(groupDto.getIsPublic());

        return groupRepository.save(group);
    }

    public void deleteGroup(Long groupId, Long userId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        if (!group.getCreator().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this group");
        }

        group.setIsActive(false);
        groupRepository.save(group);
    }

    public GroupMember joinGroup(Long groupId, Long userId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if user is already a member
        boolean isMember = group.getMembers().stream()
                .anyMatch(member -> member.getUser().getId().equals(userId));

        if (isMember) {
            throw new RuntimeException("User is already a member of this group");
        }

        GroupMember member = new GroupMember(group, user, GroupMember.MemberRole.MEMBER);
        group.getMembers().add(member);
        groupRepository.save(group);

        return member;
    }

    public void leaveGroup(Long groupId, Long userId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        group.getMembers().removeIf(member -> member.getUser().getId().equals(userId));
        groupRepository.save(group);
    }

    public List<Group> searchGroups(String query) {
        return groupRepository.searchGroups(query);
    }

    public List<Group> getUserGroups(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return groupRepository.findUserGroups(user);
    }
}