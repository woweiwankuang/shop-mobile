export class FocusUtil {
  static focus(elementId: string) {
    let inputField: HTMLElement = <HTMLElement>document.querySelector(elementId);
    if (inputField) {
      inputField.focus();
    }
  }
}
