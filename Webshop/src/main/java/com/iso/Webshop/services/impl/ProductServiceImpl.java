package com.iso.Webshop.services.impl;

import com.iso.Webshop.domain.Product;
import com.iso.Webshop.domain.ProductEntity;
import com.iso.Webshop.domain.User;
import com.iso.Webshop.domain.UserEntity;
import com.iso.Webshop.repositories.ProductRepository;
import com.iso.Webshop.repositories.UserRepository;
import com.iso.Webshop.services.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(final ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    @Override
    public boolean isProductExists(Product product) {
        return productRepository.existsById(product.getId());
    }

    @Override
    public Product save(Product product) {
        final ProductEntity productEntity = productToProductEntity(product);
        final ProductEntity saveProductEntity = productRepository.save(productEntity);
        return productEntityToProduct(saveProductEntity);
    }

    @Override
    public Optional<Product> findById(Long id) {
        final Optional<ProductEntity> foundProduct = productRepository.findById(id);
        return foundProduct.map(product -> productEntityToProduct(product));
    }

    @Override
    public List<Product> listProducts() {
        final List<ProductEntity> foundProducts = productRepository.findAll();
        return foundProducts.stream().map(product -> productEntityToProduct(product)).collect(Collectors.toList());
    }

    @Override
    public void deleteProductById(Long id) {
        try{
            productRepository.deleteById(id);
        }catch (final EmptyResultDataAccessException e){
            log.debug("Attempted to delete non-existing product", e);
        }
    }

    private ProductEntity productToProductEntity(Product product){
        return ProductEntity.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                //.amount(product.getAmount())
                .description(product.getDescription())
                .brand(product.getBrand())
                .build();
    }

    private Product productEntityToProduct(ProductEntity productEntity){
        return Product.builder()
                .id(productEntity.getId())
                .name(productEntity.getName())
                .price(productEntity.getPrice())
                //.amount(productEntity.getAmount())
                .description(productEntity.getDescription())
                .brand(productEntity.getBrand())
                .build();
    }
}
