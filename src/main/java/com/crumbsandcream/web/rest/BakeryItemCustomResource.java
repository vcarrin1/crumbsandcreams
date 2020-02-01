package com.crumbsandcream.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.crumbsandcream.domain.BakeryItem;
import com.crumbsandcream.repository.BakeryItemCustomRepository;
import com.crumbsandcream.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing BakeryItem.
 */
@RestController
@RequestMapping("/api")
public class BakeryItemCustomResource {

    private final Logger log = LoggerFactory.getLogger(BakeryItemCustomResource.class);

    private static final String ENTITY_NAME = "bakeryItem";

    private final BakeryItemCustomRepository bakeryItemCustomRepository;

    public BakeryItemCustomResource(BakeryItemCustomRepository bakeryItemCustomRepository) {
        this.bakeryItemCustomRepository = bakeryItemCustomRepository;
    }

    /**
     * GET  /bakery-items/:id : get the "id" bakeryItem.
     *
     * @param category the category id of the bakeryItem to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bakeryItem, or with status 404 (Not Found)
     */
    @GetMapping("/bakery-items-by-category/{category}")
    @Timed
    public ResponseEntity<List<BakeryItem>> getAllBakeryItemsByCategory(@PathVariable String category, Pageable pageable) {
        log.debug("REST request to get a page of BakeryItems");
        Page<BakeryItem> page = bakeryItemCustomRepository.findBakeryItemsByCategory(category, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/bakery-items/{category}");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
