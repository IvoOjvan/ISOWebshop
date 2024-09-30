package com.iso.Webshop.services;

import com.iso.Webshop.domain.User;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface UserService {
    boolean isUserExists(User user);
    User save(User user);
    Optional<User> findById(Long id);
    List<User> listUsers();
    void deleteUserById(Long id);
    Long findMaxId();
    Optional<User> findByEmailAndPassword(String email, String password);

}
