import { Directive, Input } from '@angular/core';
import { Keyword } from '../core/metadata.model';
import { ValidatorFn } from '@angular/forms/src/directives/validators';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appValidKeyword][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidKeywordDirective,
      multi: true
    }
  ]
})
export class ValidKeywordDirective {

  @Input() keywords: Keyword;

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} {
    return validKeywordValidator(this.keywords)(control);
  }
}

export function validKeywordValidator(keywords: Keyword): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    if (!keywords) {
      throw new Error('Invalid keywords');
    }

    // check if the given control value matches any keyword name
    for (const key in keywords) {
      if (keywords[key].displayName === control.value) {
        return null;
      }
    }

    // not matching any keyword, return error
    return { value: control.value };
  };
}
