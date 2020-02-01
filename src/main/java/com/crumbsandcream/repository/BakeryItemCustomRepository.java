package com.crumbsandcream.repository;

import com.crumbsandcream.domain.BakeryItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the BakeryItem entity.
 */
//@SuppressWarnings("unused")
@Repository
public interface BakeryItemCustomRepository extends MongoRepository<BakeryItem, Long> {

    @Query("{category : ?0}")
    Page<BakeryItem> findBakeryItemsByCategory(String category, Pageable pageable);
}
