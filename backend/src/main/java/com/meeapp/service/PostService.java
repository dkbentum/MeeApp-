package com.meeapp.service;

import com.meeapp.dto.PostDto;
import com.meeapp.entity.Post;
import com.meeapp.entity.User;
import com.meeapp.repository.PostRepository;
import com.meeapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    public List<PostDto> getAllPosts() {
        return postRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public Optional<PostDto> getPostById(Long id) {
        return postRepository.findById(id).map(this::toDto);
    }

    public PostDto createPost(PostDto postDto) {
        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setBody(postDto.getBody());
        post.setImageUrl(postDto.getImageUrl());
        post.setCategory(postDto.getCategory());
        if (postDto.getDate() != null) {
            post.setDate(LocalDate.parse(postDto.getDate()));
        }
        if (postDto.getAuthorId() != null) {
            User author = userRepository.findById(postDto.getAuthorId()).orElse(null);
            post.setAuthor(author);
        }
        Post saved = postRepository.save(post);
        return toDto(saved);
    }

    public Optional<PostDto> updatePost(Long id, PostDto postDto) {
        return postRepository.findById(id).map(post -> {
            post.setTitle(postDto.getTitle());
            post.setBody(postDto.getBody());
            post.setImageUrl(postDto.getImageUrl());
            post.setCategory(postDto.getCategory());
            if (postDto.getDate() != null) {
                post.setDate(LocalDate.parse(postDto.getDate()));
            }
            Post updated = postRepository.save(post);
            return toDto(updated);
        });
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    private PostDto toDto(Post post) {
        PostDto dto = new PostDto();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setBody(post.getBody());
        dto.setImageUrl(post.getImageUrl());
        dto.setCategory(post.getCategory());
        if (post.getDate() != null) dto.setDate(post.getDate().toString());
        if (post.getAuthor() != null) {
            dto.setAuthorId(post.getAuthor().getId());
            dto.setAuthorName(post.getAuthor().getUsername());
        }
        if (post.getCreatedAt() != null) dto.setCreatedAt(post.getCreatedAt().toString());
        if (post.getUpdatedAt() != null) dto.setUpdatedAt(post.getUpdatedAt().toString());
        return dto;
    }
} 