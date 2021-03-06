/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CartElementComponent } from './cart-element.component';

describe('CartElementComponent', () => {
  let component: CartElementComponent;
  let fixture: ComponentFixture<CartElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
