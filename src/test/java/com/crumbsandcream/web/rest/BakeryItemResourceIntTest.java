package com.crumbsandcream.web.rest;

import com.crumbsandcream.CrumbsandcreamApp;

import com.crumbsandcream.domain.BakeryItem;
import com.crumbsandcream.repository.BakeryItemRepository;
import com.crumbsandcream.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.Base64Utils;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.crumbsandcream.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.crumbsandcream.domain.enumeration.Categories;
/**
 * Test class for the BakeryItemResource REST controller.
 *
 * @see BakeryItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CrumbsandcreamApp.class)
public class BakeryItemResourceIntTest {

    private static final String DEFAULT_ITEM = "AAAAAAAAAA";
    private static final String UPDATED_ITEM = "BBBBBBBBBB";

    private static final byte[] DEFAULT_ITEM_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ITEM_IMAGE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_ITEM_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ITEM_IMAGE_CONTENT_TYPE = "image/png";

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PRICE = new BigDecimal(0);
    private static final BigDecimal UPDATED_PRICE = new BigDecimal(1);

    private static final Categories DEFAULT_CATEGORY = Categories.cupcakes;
    private static final Categories UPDATED_CATEGORY = Categories.brownies;

    private static final String DEFAULT_INGREDIENTS = "AAAAAAAAAA";
    private static final String UPDATED_INGREDIENTS = "BBBBBBBBBB";

    @Autowired
    private BakeryItemRepository bakeryItemRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restBakeryItemMockMvc;

    private BakeryItem bakeryItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BakeryItemResource bakeryItemResource = new BakeryItemResource(bakeryItemRepository);
        this.restBakeryItemMockMvc = MockMvcBuilders.standaloneSetup(bakeryItemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BakeryItem createEntity() {
        BakeryItem bakeryItem = new BakeryItem()
            .item(DEFAULT_ITEM)
            .itemImage(DEFAULT_ITEM_IMAGE)
            .itemImageContentType(DEFAULT_ITEM_IMAGE_CONTENT_TYPE)
            .createDate(DEFAULT_CREATE_DATE)
            .lastUpdate(DEFAULT_LAST_UPDATE)
            .description(DEFAULT_DESCRIPTION)
            .price(DEFAULT_PRICE)
            .category(DEFAULT_CATEGORY)
            .ingredients(DEFAULT_INGREDIENTS);
        return bakeryItem;
    }

    @Before
    public void initTest() {
        bakeryItemRepository.deleteAll();
        bakeryItem = createEntity();
    }

    @Test
    public void createBakeryItem() throws Exception {
        int databaseSizeBeforeCreate = bakeryItemRepository.findAll().size();

        // Create the BakeryItem
        restBakeryItemMockMvc.perform(post("/api/bakery-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bakeryItem)))
            .andExpect(status().isCreated());

        // Validate the BakeryItem in the database
        List<BakeryItem> bakeryItemList = bakeryItemRepository.findAll();
        assertThat(bakeryItemList).hasSize(databaseSizeBeforeCreate + 1);
        BakeryItem testBakeryItem = bakeryItemList.get(bakeryItemList.size() - 1);
        assertThat(testBakeryItem.getItem()).isEqualTo(DEFAULT_ITEM);
        assertThat(testBakeryItem.getItemImage()).isEqualTo(DEFAULT_ITEM_IMAGE);
        assertThat(testBakeryItem.getItemImageContentType()).isEqualTo(DEFAULT_ITEM_IMAGE_CONTENT_TYPE);
        assertThat(testBakeryItem.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testBakeryItem.getLastUpdate()).isEqualTo(DEFAULT_LAST_UPDATE);
        assertThat(testBakeryItem.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testBakeryItem.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testBakeryItem.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testBakeryItem.getIngredients()).isEqualTo(DEFAULT_INGREDIENTS);
    }

    @Test
    public void createBakeryItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bakeryItemRepository.findAll().size();

        // Create the BakeryItem with an existing ID
        bakeryItem.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restBakeryItemMockMvc.perform(post("/api/bakery-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bakeryItem)))
            .andExpect(status().isBadRequest());

        // Validate the BakeryItem in the database
        List<BakeryItem> bakeryItemList = bakeryItemRepository.findAll();
        assertThat(bakeryItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkCreateDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = bakeryItemRepository.findAll().size();
        // set the field null
        bakeryItem.setCreateDate(null);

        // Create the BakeryItem, which fails.

        restBakeryItemMockMvc.perform(post("/api/bakery-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bakeryItem)))
            .andExpect(status().isBadRequest());

        List<BakeryItem> bakeryItemList = bakeryItemRepository.findAll();
        assertThat(bakeryItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCategoryIsRequired() throws Exception {
        int databaseSizeBeforeTest = bakeryItemRepository.findAll().size();
        // set the field null
        bakeryItem.setCategory(null);

        // Create the BakeryItem, which fails.

        restBakeryItemMockMvc.perform(post("/api/bakery-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bakeryItem)))
            .andExpect(status().isBadRequest());

        List<BakeryItem> bakeryItemList = bakeryItemRepository.findAll();
        assertThat(bakeryItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllBakeryItems() throws Exception {
        // Initialize the database
        bakeryItemRepository.save(bakeryItem);

        // Get all the bakeryItemList
        restBakeryItemMockMvc.perform(get("/api/bakery-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bakeryItem.getId())))
            .andExpect(jsonPath("$.[*].item").value(hasItem(DEFAULT_ITEM.toString())))
            .andExpect(jsonPath("$.[*].itemImageContentType").value(hasItem(DEFAULT_ITEM_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].itemImage").value(hasItem(Base64Utils.encodeToString(DEFAULT_ITEM_IMAGE))))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastUpdate").value(hasItem(DEFAULT_LAST_UPDATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].ingredients").value(hasItem(DEFAULT_INGREDIENTS.toString())));
    }
    

    @Test
    public void getBakeryItem() throws Exception {
        // Initialize the database
        bakeryItemRepository.save(bakeryItem);

        // Get the bakeryItem
        restBakeryItemMockMvc.perform(get("/api/bakery-items/{id}", bakeryItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bakeryItem.getId()))
            .andExpect(jsonPath("$.item").value(DEFAULT_ITEM.toString()))
            .andExpect(jsonPath("$.itemImageContentType").value(DEFAULT_ITEM_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.itemImage").value(Base64Utils.encodeToString(DEFAULT_ITEM_IMAGE)))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.lastUpdate").value(DEFAULT_LAST_UPDATE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.ingredients").value(DEFAULT_INGREDIENTS.toString()));
    }
    @Test
    public void getNonExistingBakeryItem() throws Exception {
        // Get the bakeryItem
        restBakeryItemMockMvc.perform(get("/api/bakery-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateBakeryItem() throws Exception {
        // Initialize the database
        bakeryItemRepository.save(bakeryItem);

        int databaseSizeBeforeUpdate = bakeryItemRepository.findAll().size();

        // Update the bakeryItem
        BakeryItem updatedBakeryItem = bakeryItemRepository.findById(bakeryItem.getId()).get();
        updatedBakeryItem
            .item(UPDATED_ITEM)
            .itemImage(UPDATED_ITEM_IMAGE)
            .itemImageContentType(UPDATED_ITEM_IMAGE_CONTENT_TYPE)
            .createDate(UPDATED_CREATE_DATE)
            .lastUpdate(UPDATED_LAST_UPDATE)
            .description(UPDATED_DESCRIPTION)
            .price(UPDATED_PRICE)
            .category(UPDATED_CATEGORY)
            .ingredients(UPDATED_INGREDIENTS);

        restBakeryItemMockMvc.perform(put("/api/bakery-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBakeryItem)))
            .andExpect(status().isOk());

        // Validate the BakeryItem in the database
        List<BakeryItem> bakeryItemList = bakeryItemRepository.findAll();
        assertThat(bakeryItemList).hasSize(databaseSizeBeforeUpdate);
        BakeryItem testBakeryItem = bakeryItemList.get(bakeryItemList.size() - 1);
        assertThat(testBakeryItem.getItem()).isEqualTo(UPDATED_ITEM);
        assertThat(testBakeryItem.getItemImage()).isEqualTo(UPDATED_ITEM_IMAGE);
        assertThat(testBakeryItem.getItemImageContentType()).isEqualTo(UPDATED_ITEM_IMAGE_CONTENT_TYPE);
        assertThat(testBakeryItem.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testBakeryItem.getLastUpdate()).isEqualTo(UPDATED_LAST_UPDATE);
        assertThat(testBakeryItem.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testBakeryItem.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testBakeryItem.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testBakeryItem.getIngredients()).isEqualTo(UPDATED_INGREDIENTS);
    }

    @Test
    public void updateNonExistingBakeryItem() throws Exception {
        int databaseSizeBeforeUpdate = bakeryItemRepository.findAll().size();

        // Create the BakeryItem

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBakeryItemMockMvc.perform(put("/api/bakery-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bakeryItem)))
            .andExpect(status().isBadRequest());

        // Validate the BakeryItem in the database
        List<BakeryItem> bakeryItemList = bakeryItemRepository.findAll();
        assertThat(bakeryItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteBakeryItem() throws Exception {
        // Initialize the database
        bakeryItemRepository.save(bakeryItem);

        int databaseSizeBeforeDelete = bakeryItemRepository.findAll().size();

        // Get the bakeryItem
        restBakeryItemMockMvc.perform(delete("/api/bakery-items/{id}", bakeryItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BakeryItem> bakeryItemList = bakeryItemRepository.findAll();
        assertThat(bakeryItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BakeryItem.class);
        BakeryItem bakeryItem1 = new BakeryItem();
        bakeryItem1.setId("id1");
        BakeryItem bakeryItem2 = new BakeryItem();
        bakeryItem2.setId(bakeryItem1.getId());
        assertThat(bakeryItem1).isEqualTo(bakeryItem2);
        bakeryItem2.setId("id2");
        assertThat(bakeryItem1).isNotEqualTo(bakeryItem2);
        bakeryItem1.setId(null);
        assertThat(bakeryItem1).isNotEqualTo(bakeryItem2);
    }
}
