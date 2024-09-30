package com.iso.Webshop.controllers;

import com.iso.Webshop.domain.Order;
import com.iso.Webshop.domain.OrderEntity;
import com.iso.Webshop.domain.Product;
import com.iso.Webshop.services.OrderService;
import com.iso.Webshop.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("orders")
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(final OrderService orderService){
        this.orderService = orderService;
    }

    @PutMapping(path = "/create/{id}")
    public ResponseEntity<Order> createUpdateOrder(
            @PathVariable final Long id,
            @RequestBody final Order order
    ){
        order.setId(id);

        final boolean isOrderExists = orderService.isOrderExists(order);
        final Order savedOrder = orderService.save(order);

        if(isOrderExists){
            return new ResponseEntity<Order>(savedOrder, HttpStatus.OK);
        }else{
            return new ResponseEntity<Order>(savedOrder, HttpStatus.CREATED);
        }
    }

    @GetMapping(path = "/order/{id}")
    public ResponseEntity<Order> getOrder(
            @PathVariable final Long id
    ){
        final Optional<Order> foundOrder = orderService.findById(id);
        return foundOrder.map(order ->
                        new ResponseEntity<Order>(order, HttpStatus.OK))
                .orElse(new ResponseEntity<Order>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<Order>> listOrders(){
        return new ResponseEntity<>(orderService.listOrders(), HttpStatus.OK);
    }

    @DeleteMapping(path = "delete/{id}")
    public ResponseEntity deleteOrder(
            @PathVariable final Long id
    ){
        orderService.deleteOrderById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping(path = "user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(
            @PathVariable final Long userId
    ){
        List<Order> orders = orderService.getOrderByUserId(userId);
        if(orders.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(orders, HttpStatus.OK);
        }
    }
}

