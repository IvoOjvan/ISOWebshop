package com.iso.Webshop.services.impl;

import com.iso.Webshop.domain.*;
import com.iso.Webshop.repositories.OrderRepository;
import com.iso.Webshop.services.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(final OrderRepository orderRepository){
        this.orderRepository = orderRepository;
    }

    @Override
    public boolean isOrderExists(Order order) {
        return orderRepository.existsById(order.getId());
    }

    @Override
    public Order save(Order order) {
        final OrderEntity orderEntity = orderToOrderEntity(order);
        final OrderEntity saveOrderEntity = orderRepository.save(orderEntity);
        return orderEntityToOrder(saveOrderEntity);
    }

    @Override
    public Optional<Order> findById(Long id) {
        final Optional<OrderEntity> foundOrder = orderRepository.findById(id);
        return foundOrder.map(order -> orderEntityToOrder(order));
    }

    @Override
    public List<Order> listOrders() {
        final List<OrderEntity> foundOrders = orderRepository.findAll();
        return foundOrders.stream().map(order -> orderEntityToOrder(order)).collect(Collectors.toList());
    }

    @Override
    public void deleteOrderById(Long id) {
        try{
            orderRepository.deleteById(id);
        }catch (final EmptyResultDataAccessException e){
            log.debug("Attempted to delete non-existing order", e);
        }
    }

    @Override
    public List<Order> getOrderByUserId(Long id) {
        final List<OrderEntity> allOrders = orderRepository.findAll();
        List<Order> targetOrders = new ArrayList<>();
        for (OrderEntity oe : allOrders){
            Order order = orderEntityToOrder(oe);
            if(order.getUserId() == id){
                targetOrders.add(order);
            }
        }
        return targetOrders;

        /*final List<OrderEntity> foundOrders = orderRepository.getOrdersByUserId(id);
        return foundOrders.stream()
                .map(order -> orderEntityToOrder(order))
                .collect(Collectors.toList());*/
    }

    private OrderEntity orderToOrderEntity(Order order){
        return OrderEntity.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .description(order.getDescription())
                .total(order.getTotal())
                .date(order.getDate())
                .build();
    }

    private Order orderEntityToOrder(OrderEntity orderEntity){
        return Order.builder()
                .id(orderEntity.getId())
                .userId(orderEntity.getUserId())
                .description(orderEntity.getDescription())
                .total(orderEntity.getTotal())
                .date(orderEntity.getDate())
                .build();
    }
}
