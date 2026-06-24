// modal/modal-ref.ts
import { Subject } from 'rxjs';

/**
 * این کلاس مثل reference مودال عمل می‌کند
 * (مثل MatDialogRef در Angular Material)
 */
export class ModalRef<T = any, R = any> {
  private _afterClosed = new Subject<R | undefined>();

  /** Observable برای گرفتن نتیجه بعد از بسته شدن modal */
  afterClosed$ = this._afterClosed.asObservable();

  constructor(private closeFn: (result?: R) => void) {}

  /**
   * بستن modal و ارسال نتیجه
   */
  close(result?: R) {
    this.closeFn(result);
    this._afterClosed.next(result);
    this._afterClosed.complete();
  }
}
