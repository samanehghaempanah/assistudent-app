import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { VisaListPage } from './visa-list.page';

describe('VisaListPage', () => {
  let fixture: ComponentFixture<VisaListPage>;
  let component: VisaListPage;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisaListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
