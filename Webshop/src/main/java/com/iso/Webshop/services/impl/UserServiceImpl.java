package com.iso.Webshop.services.impl;

import com.iso.Webshop.domain.User;
import com.iso.Webshop.domain.UserEntity;
import com.iso.Webshop.repositories.UserRepository;
import com.iso.Webshop.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(final UserRepository userRepository){ this.userRepository = userRepository; }

    @Override
    public boolean isUserExists(User user) {
        return userRepository.existsById(user.getId());
    }

    @Override
    public User save(User user) {
        final UserEntity userEntity = userToUserEntity(user);
        final UserEntity saveUserEntity = userRepository.save(userEntity);
        return userEntityToUser(saveUserEntity);
    }

    @Override
    public Optional<User> findById(Long id) {
        final Optional<UserEntity> foundUser = userRepository.findById(id);
        return foundUser.map(user -> userEntityToUser(user));
    }
    
    @Override
    public List<User> listUsers() {
        final List<UserEntity> foundUsers = userRepository.findAll();
        return foundUsers.stream().map(user -> userEntityToUser(user)).collect(Collectors.toList());
    }

    @Override
    public void deleteUserById(Long id) {
        try{
            userRepository.deleteById(id);
        }catch (final EmptyResultDataAccessException e){
            log.debug("Attemted to delete non-existing user", e);
        }
    }

    @Override
    public Long findMaxId(){
        return userRepository.findMaxId();
    }

    @Override
    public Optional<User> findByEmailAndPassword(String email, String password){
        final Optional<UserEntity> foundUser = userRepository.findByEmailAndPassword(email, password);
        return foundUser.map(user -> userEntityToUser(user));
    }

    private UserEntity userToUserEntity(User user){
        return UserEntity.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .password(user.getPassword())
                .isAdmin(user.getIsAdmin())
                .build();
    }

    private User userEntityToUser(UserEntity userEntity){
        return User.builder()
                .id(userEntity.getId())
                .firstname(userEntity.getFirstname())
                .lastname(userEntity.getLastname())
                .email(userEntity.getEmail())
                .password(userEntity.getPassword())
                .isAdmin(userEntity.getIsAdmin())
                .build();
    }
}
