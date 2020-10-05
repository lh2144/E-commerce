import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormValidationService {
  constructor() { }

  public static getErrors(prop: string, erros: any): string {
    const ErrorMessage = {
      required: 'Requried'
    };
    return ErrorMessage[prop];
  }
}
