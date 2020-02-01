package com.crumbsandcream.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.crumbsandcream.domain.BakeryItem;
import com.crumbsandcream.repository.BakeryItemRepository;
import com.crumbsandcream.web.rest.errors.BadRequestAlertException;
import com.crumbsandcream.web.rest.util.HeaderUtil;
import com.crumbsandcream.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BakeryItem.
 */
@RestController
@RequestMapping("/api")
public class BakeryItemResource {

    private final Logger log = LoggerFactory.getLogger(BakeryItemResource.class);

    private static final String ENTITY_NAME = "bakeryItem";

    private final BakeryItemRepository bakeryItemRepository;

    public BakeryItemResource(BakeryItemRepository bakeryItemRepository) {
        this.bakeryItemRepository = bakeryItemRepository;
    }

    /**
     * POST  /bakery-items : Create a new bakeryItem.
     *
     * @param bakeryItem the bakeryItem to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bakeryItem, or with status 400 (Bad Request) if the bakeryItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bakery-items")
    @Timed
    public ResponseEntity<BakeryItem> createBakeryItem(@Valid @RequestBody BakeryItem bakeryItem) throws URISyntaxException {
        log.debug("REST request to save BakeryItem : {}", bakeryItem);
        if (bakeryItem.getId() != null) {
            throw new BadRequestAlertException("A new bakeryItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BakeryItem result = bakeryItemRepository.save(bakeryItem);
        return ResponseEntity.created(new URI("/api/bakery-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bakery-items : Updates an existing bakeryItem.
     *
     * @param bakeryItem the bakeryItem to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bakeryItem,
     * or with status 400 (Bad Request) if the bakeryItem is not valid,
     * or with status 500 (Internal Server Error) if the bakeryItem couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bakery-items")
    @Timed
    public ResponseEntity<BakeryItem> updateBakeryItem(@Valid @RequestBody BakeryItem bakeryItem) throws URISyntaxException {
        log.debug("REST request to update BakeryItem : {}", bakeryItem);
        if (bakeryItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BakeryItem result = bakeryItemRepository.save(bakeryItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bakeryItem.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bakery-items : get all the bakeryItems.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of bakeryItems in body
     */
    @GetMapping("/bakery-items")
    @Timed
    public ResponseEntity<List<BakeryItem>> getAllBakeryItems(Pageable pageable) {
        log.debug("REST request to get a page of BakeryItems");
        Page<BakeryItem> page = bakeryItemRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/bakery-items");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /bakery-items/:id : get the "id" bakeryItem.
     *
     * @param id the id of the bakeryItem to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bakeryItem, or with status 404 (Not Found)
     */
    @GetMapping("/bakery-items/{id}")
    @Timed
    public ResponseEntity<BakeryItem> getBakeryItem(@PathVariable String id) {
        log.debug("REST request to get BakeryItem : {}", id);
        Optional<BakeryItem> bakeryItem = bakeryItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bakeryItem);
    }

    /**
     * DELETE  /bakery-items/:id : delete the "id" bakeryItem.
     *
     * @param id the id of the bakeryItem to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bakery-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteBakeryItem(@PathVariable String id) {
        log.debug("REST request to delete BakeryItem : {}", id);

        bakeryItemRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
