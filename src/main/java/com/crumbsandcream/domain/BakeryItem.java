package com.crumbsandcream.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

import com.crumbsandcream.domain.enumeration.Categories;

/**
 * A BakeryItem.
 */
@Document(collection = "bakery_item")
public class BakeryItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("item")
    private String item;

    @Field("item_image")
    private byte[] itemImage;

    @Field("item_image_content_type")
    private String itemImageContentType;

    @NotNull
    @Field("create_date")
    private Instant createDate;

    @Field("last_update")
    private Instant lastUpdate;

    @Field("description")
    private String description;

    @DecimalMin(value = "0")
    @Field("price")
    private BigDecimal price;

    @NotNull
    @Field("category")
    private Categories category;

    @Field("ingredients")
    private String ingredients;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getItem() {
        return item;
    }

    public BakeryItem item(String item) {
        this.item = item;
        return this;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public byte[] getItemImage() {
        return itemImage;
    }

    public BakeryItem itemImage(byte[] itemImage) {
        this.itemImage = itemImage;
        return this;
    }

    public void setItemImage(byte[] itemImage) {
        this.itemImage = itemImage;
    }

    public String getItemImageContentType() {
        return itemImageContentType;
    }

    public BakeryItem itemImageContentType(String itemImageContentType) {
        this.itemImageContentType = itemImageContentType;
        return this;
    }

    public void setItemImageContentType(String itemImageContentType) {
        this.itemImageContentType = itemImageContentType;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public BakeryItem createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getLastUpdate() {
        return lastUpdate;
    }

    public BakeryItem lastUpdate(Instant lastUpdate) {
        this.lastUpdate = lastUpdate;
        return this;
    }

    public void setLastUpdate(Instant lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public String getDescription() {
        return description;
    }

    public BakeryItem description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public BakeryItem price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Categories getCategory() {
        return category;
    }

    public BakeryItem category(Categories category) {
        this.category = category;
        return this;
    }

    public void setCategory(Categories category) {
        this.category = category;
    }

    public String getIngredients() {
        return ingredients;
    }

    public BakeryItem ingredients(String ingredients) {
        this.ingredients = ingredients;
        return this;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BakeryItem bakeryItem = (BakeryItem) o;
        if (bakeryItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bakeryItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BakeryItem{" +
            "id=" + getId() +
            ", item='" + getItem() + "'" +
            ", itemImage='" + getItemImage() + "'" +
            ", itemImageContentType='" + getItemImageContentType() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", lastUpdate='" + getLastUpdate() + "'" +
            ", description='" + getDescription() + "'" +
            ", price=" + getPrice() +
            ", category='" + getCategory() + "'" +
            ", ingredients='" + getIngredients() + "'" +
            "}";
    }
}
