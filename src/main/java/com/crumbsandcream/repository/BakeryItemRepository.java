package com.crumbsandcream.repository;

import com.crumbsandcream.domain.BakeryItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the BakeryItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BakeryItemRepository extends MongoRepository<BakeryItem, String> {

}
