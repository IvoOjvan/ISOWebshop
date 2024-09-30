package com.iso.Webshop.controllers;

import com.iso.Webshop.domain.Product;
import com.iso.Webshop.domain.User;
import com.iso.Webshop.services.ProductService;
import com.iso.Webshop.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("products")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(final ProductService productService){
        this.productService = productService;
    }

    @PutMapping(path = "/create/{id}")
    public ResponseEntity<Product> createUpdateProduct(
            @PathVariable final Long id,
            @RequestBody final Product product
    ){
        product.setId(id);

        final boolean isProductExists = productService.isProductExists(product);
        final Product savedProduct = productService.save(product);

        if(isProductExists){
            return new ResponseEntity<Product>(savedProduct, HttpStatus.OK);
        }else{
            return new ResponseEntity<Product>(savedProduct, HttpStatus.CREATED);
        }
    }


    @GetMapping(path = "/product/{id}")
    public ResponseEntity<Product> getProduct(
            @PathVariable final Long id
    ){
        final Optional<Product> foundProduct = productService.findById(id);
        return foundProduct.map(product ->
                        new ResponseEntity<Product>(product, HttpStatus.OK))
                .orElse(new ResponseEntity<Product>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<Product>> listProducts(){
        return new ResponseEntity<>(productService.listProducts(), HttpStatus.OK);
    }

    @DeleteMapping(path = "delete/{id}")
    public ResponseEntity deleteProduct(
            @PathVariable final Long id
    ){
        productService.deleteProductById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


}
