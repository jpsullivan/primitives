import { booleanAttribute, Directive, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Orientation, RdxRovingFocusGroupDirective } from '@radix-ng/primitives/roving-focus';
import { RadioGroupDirective, RadioGroupProps, RDX_RADIO_GROUP } from './radio-tokens';

@Directive({
    selector: '[rdxRadioRoot]',
    exportAs: 'rdxRadioRoot',
    standalone: true,
    providers: [
        { provide: RDX_RADIO_GROUP, useExisting: RdxRadioGroupDirective },
        { provide: NG_VALUE_ACCESSOR, useExisting: RdxRadioGroupDirective, multi: true }
    ],
    hostDirectives: [{ directive: RdxRovingFocusGroupDirective, inputs: ['dir', 'orientation', 'loop'] }],
    host: {
        role: 'radiogroup',
        '[attr.aria-orientation]': 'orientation',
        '[attr.data-disabled]': 'disabled ? "" : null',
        '(keydown)': 'onKeydown()'
    }
})
export class RdxRadioGroupDirective implements RadioGroupProps, RadioGroupDirective, ControlValueAccessor {
    @Input() value?: string;

    @Input({ transform: booleanAttribute }) disabled = false;

    @Input() defaultValue?: string;

    @Input() orientation: Orientation = 'vertical';

    /**
     * Event handler called when the value changes.
     */
    @Output() readonly onValueChange = new EventEmitter<string>();

    /**
     * The callback function to call when the value of the radio group changes.
     */
    private onChange: (value: string) => void = () => {
        /* Empty */
    };

    /**
     * The callback function to call when the radio group is touched.
     * @ignore
     */
    onTouched: () => void = () => {
        /* Empty */
    };

    /**
     * Select a radio item.
     * @param value The value of the radio item to select.
     * @ignore
     */
    select(value: string): void {
        this.value = value;
        this.onValueChange.emit(value);
        this.onChange?.(value);
        this.onTouched();
    }

    /**
     * Update the value of the radio group.
     * @param value The new value of the radio group.
     * @ignore
     */
    writeValue(value: string): void {
        this.value = value;
    }

    /**
     * Register a callback function to call when the value of the radio group changes.
     * @param fn The callback function to call when the value of the radio group changes.
     * @ignore
     */
    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    /** @ignore */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /**
     * Set the disabled state of the radio group.
     * @param isDisabled Whether the radio group is disabled.
     * @ignore
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    protected onKeydown(): void {
        if (this.disabled) return;
    }
}
