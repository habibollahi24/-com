import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
  InjectionToken,
  Injector,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModalComponent } from './modal.component';

export const MODAL_DATA = new InjectionToken<any>('MODAL_DATA');

export const MODAL_REF = new InjectionToken<{
  close: (result?: any) => void;
  afterClosed$: Observable<any>;
}>('MODAL_REF');

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(
    private appRef: ApplicationRef,
    private envInjector: EnvironmentInjector,
  ) {}

  open(component: any, data?: any) {
    const afterClosedSubject = new Subject<any>();

    let modalComponentRef!: ComponentRef<ModalComponent>;

    // چیزی که به عنوان ModalRef در اختیار همه قرار می‌دهیم
    const modalRef = {
      close: (result?: any) => {
        // ارسال نتیجه
        afterClosedSubject.next(result);

        // پایان observable
        afterClosedSubject.complete();

        // حذف modal
        this.appRef.detachView(modalComponentRef.hostView);

        modalComponentRef.destroy();
      },

      afterClosed$: afterClosedSubject.asObservable(),
    };

    // injector اختصاصی
    const injector = Injector.create({
      providers: [
        {
          provide: MODAL_REF,
          useValue: modalRef,
        },

        {
          provide: MODAL_DATA,
          useValue: data,
        },
      ],
      parent: this.envInjector,
    });

    // ساخت ModalComponent
    modalComponentRef = createComponent(ModalComponent, {
      environmentInjector: this.envInjector,
      elementInjector: injector,
    });

    // کامپوننتی که باید داخل modal نمایش داده شود
    modalComponentRef.instance.component = component;

    // attach به برنامه
    this.appRef.attachView(modalComponentRef.hostView);

    // append به body
    document.body.appendChild(modalComponentRef.location.nativeElement);

    return modalRef;
  }
}
