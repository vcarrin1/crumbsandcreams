/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrumbsandcreamTestModule } from '../../../test.module';
import { BakeryItemDetailComponent } from 'app/entities/bakery-item/bakery-item-detail.component';
import { BakeryItem } from 'app/shared/model/bakery-item.model';

describe('Component Tests', () => {
    describe('BakeryItem Management Detail Component', () => {
        let comp: BakeryItemDetailComponent;
        let fixture: ComponentFixture<BakeryItemDetailComponent>;
        const route = ({ data: of({ bakeryItem: new BakeryItem('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CrumbsandcreamTestModule],
                declarations: [BakeryItemDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BakeryItemDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BakeryItemDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.bakeryItem).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
