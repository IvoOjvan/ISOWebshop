package com.iso.Webshop.repositories;

import com.iso.Webshop.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    @Query("SELECT MAX(u.id) FROM UserEntity u")
    Long findMaxId();

    @Query("SELECT u FROM UserEntity u WHERE u.email = :email AND u.password = :password")
    Optional<UserEntity> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
}
