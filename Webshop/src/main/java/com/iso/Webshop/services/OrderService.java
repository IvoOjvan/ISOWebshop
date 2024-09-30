package com.iso.Webshop.services;

import com.iso.Webshop.domain.Order;
import com.iso.Webshop.domain.OrderEntity;
import com.iso.Webshop.domain.Product;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    boolean isOrderExists(Order order);
    Order save(Order order);
    Optional<Order> findById(Long id);
    List<Order> listOrders();
    void deleteOrderById(Long id);

    List<Order> getOrderByUserId(Long id);
}
