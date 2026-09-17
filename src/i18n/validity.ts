import type { FormEvent, InvalidEvent } from "react";

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/** What the browser's validation bubble should say for one field. */
export type ValidityMessages = {
  /** The field is required and empty. */
  missing: string;
  /** The value is there but not valid (e.g. not an email address). */
  invalid?: string;
};

/** Props that make the browser's own validation bubble speak the PAGE's
 *  language instead of the browser's: an English page opened in a
 *  Lithuanian browser would otherwise say "Užpildykite šį lauką". The bubble
 *  and the validation rules themselves are untouched.
 *
 *    <input required {...validityProps(t.validation.name)} />
 *
 *  The custom message is cleared on every input, so a field that has been
 *  fixed is valid again straight away. */
export function validityProps(messages: ValidityMessages) {
  return {
    onInvalid(e: InvalidEvent<Field>) {
      const el = e.currentTarget;
      el.setCustomValidity("");
      if (el.validity.valueMissing) {
        el.setCustomValidity(messages.missing);
      } else if (!el.validity.valid && messages.invalid) {
        el.setCustomValidity(messages.invalid);
      }
    },
    onInput(e: FormEvent<Field>) {
      e.currentTarget.setCustomValidity("");
    },
  };
}
