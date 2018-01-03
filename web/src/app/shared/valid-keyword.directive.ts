import { Directive, Input } from '@angular/core';
import { Keyword } from '../core/metadata.model';
import { ValidatorFn } from '@angular/forms/src/directives/validators';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

/**
 * Angular Module: [[SharedModule]]
 *
 * Directive to verify whether a keyword is
 * valid (in the resource map).
 */
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

  /**
   * @input keyword resource map
   */
  @Input() keywords: Keyword;

  constructor() { }

  /**
   * validate whether the value in an input element is a valid keyword
   * @param control control object of an input element
   * @returns null is valid, error object if not
   */
  validate(control: AbstractControl): {[key: string]: any} {
    return validKeywordValidator(this.keywords)(control);
  }
}

/**
 * keyword validation function for an input element
 * @param keywords keyword resource map
 * @returns a function that take a control object and return null if
 *  the input is valid, error object otherwise
 */
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
