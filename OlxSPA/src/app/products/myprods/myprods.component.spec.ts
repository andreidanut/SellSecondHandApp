/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyprodsComponent } from './myprods.component';

describe('MyprodsComponent', () => {
  let component: MyprodsComponent;
  let fixture: ComponentFixture<MyprodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
