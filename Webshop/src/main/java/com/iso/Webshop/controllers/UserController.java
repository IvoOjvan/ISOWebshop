package com.iso.Webshop.controllers;

import com.iso.Webshop.domain.User;
import com.iso.Webshop.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(final UserService userService){
        this.userService = userService;
    }

    @PutMapping(path = "/create/{id}")
    public ResponseEntity<User> createUpdateUser(
        @PathVariable final Long id,
        @RequestBody final User user
    ){
        user.setId(id);

        final boolean isUserExists = userService.isUserExists(user);
        final User savedUser = userService.save(user);

        if(isUserExists){
            return new ResponseEntity<User>(savedUser, HttpStatus.OK);
        }else{
            return new ResponseEntity<User>(savedUser, HttpStatus.CREATED);
        }
    }


    @GetMapping(path = "/user/{id}")
    public ResponseEntity<User> getUser(
        @PathVariable final Long id
    ){
        final Optional<User> foundUser = userService.findById(id);
        return foundUser.map(user ->
                        new ResponseEntity<User>(user, HttpStatus.OK))
                .orElse(new ResponseEntity<User>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<User>> listUsers(){
        return new ResponseEntity<>(userService.listUsers(), HttpStatus.OK);
    }

    @DeleteMapping(path = "delete/{id}")
    public ResponseEntity deleteUser(
        @PathVariable final Long id
    ){
        userService.deleteUserById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/max-id")
    public ResponseEntity<Long> getMaxId() {
        Long maxId = userService.findMaxId();
        return new ResponseEntity<>(maxId, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<User> getUserByPasswordAndEmail(
        @RequestBody User userData
    ){
        final Optional<User> foundUser = userService.findByEmailAndPassword(userData.getEmail(), userData.getPassword());
        return foundUser.map(user ->
                        new ResponseEntity<User>(user, HttpStatus.OK))
                .orElse(new ResponseEntity<User>(HttpStatus.NOT_FOUND));
    }
}
