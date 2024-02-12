import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { VisaViewPage } from './visa-view.page';

describe('VisaViewPage', () => {
  let fixture: ComponentFixture<VisaViewPage>;
  let component: VisaViewPage;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisaViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisaViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
