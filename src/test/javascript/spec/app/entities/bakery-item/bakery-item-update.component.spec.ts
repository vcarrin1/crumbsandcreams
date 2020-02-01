/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CrumbsandcreamTestModule } from '../../../test.module';
import { BakeryItemUpdateComponent } from 'app/entities/bakery-item/bakery-item-update.component';
import { BakeryItemService } from 'app/entities/bakery-item/bakery-item.service';
import { BakeryItem } from 'app/shared/model/bakery-item.model';

describe('Component Tests', () => {
    describe('BakeryItem Management Update Component', () => {
        let comp: BakeryItemUpdateComponent;
        let fixture: ComponentFixture<BakeryItemUpdateComponent>;
        let service: BakeryItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CrumbsandcreamTestModule],
                declarations: [BakeryItemUpdateComponent]
            })
                .overrideTemplate(BakeryItemUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BakeryItemUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BakeryItemService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BakeryItem('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bakeryItem = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BakeryItem();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bakeryItem = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
