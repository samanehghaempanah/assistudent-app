import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { VisaHistoryPage } from './visa-history.page';

describe('VisaHistoryPage', () => {
  let fixture: ComponentFixture<VisaHistoryPage>;
  let component: VisaHistoryPage;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisaHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisaHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
