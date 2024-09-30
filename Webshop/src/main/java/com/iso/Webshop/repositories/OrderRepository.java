package com.iso.Webshop.repositories;

import com.iso.Webshop.domain.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    @Query("SELECT o FROM OrderEntity o WHERE o.userId =: userId")
    List<OrderEntity> getOrdersByUserId(
            @Param("userId") Long userId
    );
}
