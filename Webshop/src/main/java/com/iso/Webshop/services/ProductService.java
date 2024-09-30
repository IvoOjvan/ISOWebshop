package com.iso.Webshop.services;

import com.iso.Webshop.domain.Product;
import com.iso.Webshop.domain.User;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    boolean isProductExists(Product product);
    Product save(Product product);
    Optional<Product> findById(Long id);
    List<Product> listProducts();
    void deleteProductById(Long id);
}
