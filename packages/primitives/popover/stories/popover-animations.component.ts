import { Component, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RdxPositionAlign, RdxPositionSide } from '@radix-ng/primitives/core';
import { LucideAngularModule, MountainSnow, TriangleAlert, X } from 'lucide-angular';
import { RdxPopoverModule, RdxPopoverRootDirective } from '../index';
import { RdxPopoverContentAttributesComponent } from '../src/popover-content-attributes.component';
import { provideRdxCdkEventService } from '../src/utils/cdk-event.service';
import { containerAlert } from './utils/constants';
import { OptionPanelBase } from './utils/option-panel-base.class';
import styles from './utils/styles.constants';
import { WithOptionPanelComponent } from './utils/with-option-panel.component';

@Component({
    selector: 'rdx-popover-animations',
    providers: [provideRdxCdkEventService()],
    imports: [
        FormsModule,
        RdxPopoverModule,
        LucideAngularModule,
        RdxPopoverContentAttributesComponent,
        WithOptionPanelComponent
    ],
    styles: styles(true),
    template: `
        <popover-with-option-panel
            [arrowWidth]="arrowWidth()"
            [arrowHeight]="arrowHeight()"
            (onOverlayEscapeKeyDownDisabledChange)="onOverlayEscapeKeyDownDisabled.set($event)"
            (onOverlayOutsideClickDisabledChange)="onOverlayOutsideClickDisabled.set($event)"
            (arrowWidthChange)="arrowWidth.set($event)"
            (arrowHeightChange)="arrowHeight.set($event)"
        >
            <div class="ParamsContainer">
                <input [ngModel]="cssAnimation()" (ngModelChange)="cssAnimation.set($event)" type="checkbox" />
                CSS Animation
                <input
                    [ngModel]="cssOpeningAnimation()"
                    (ngModelChange)="cssOpeningAnimation.set($event)"
                    type="checkbox"
                />
                On Opening Animation
                <input
                    [ngModel]="cssClosingAnimation()"
                    (ngModelChange)="cssClosingAnimation.set($event)"
                    type="checkbox"
                />
                On Closing Animation
            </div>

            <div class="ContainerAlerts">
                <lucide-angular [img]="TriangleAlert" size="16" />
                {{ containerAlert }}
            </div>
            <div class="container">
                <ng-container
                    [cssAnimation]="cssAnimation()"
                    [cssOpeningAnimation]="cssOpeningAnimation()"
                    [cssClosingAnimation]="cssClosingAnimation()"
                    rdxPopoverRoot
                >
                    <button class="IconButton reset" rdxPopoverTrigger>
                        <lucide-angular [img]="MountainSnowIcon" size="16" style="display: flex" />
                    </button>

                    <ng-template
                        [onOverlayEscapeKeyDownDisabled]="onOverlayEscapeKeyDownDisabled()"
                        [onOverlayOutsideClickDisabled]="onOverlayOutsideClickDisabled()"
                        rdxPopoverContent
                    >
                        <div class="PopoverContent" rdxPopoverContentAttributes>
                            <div style="display: flex; flex-direction: column; gap: 10px">
                                <p class="Text" style="margin-bottom: 10px">Dimensions</p>
                                <fieldset class="reset Fieldset">
                                    <label class="Label" for="width">Width</label>
                                    <input class="reset Input" id="width" value="100%" />
                                </fieldset>
                                <fieldset class="reset Fieldset">
                                    <label class="Label" for="maxWidth">Max. width</label>
                                    <input class="reset Input" id="maxWidth" value="300px" />
                                </fieldset>
                                <fieldset class="reset Fieldset">
                                    <label class="Label" for="height">Height</label>
                                    <input class="reset Input" id="height" value="25px" />
                                </fieldset>
                                <fieldset class="reset Fieldset">
                                    <label class="Label" for="maxHeight">Max. height</label>
                                    <input class="reset Input" id="maxHeight" value="none" />
                                </fieldset>
                            </div>
                            <button class="PopoverClose reset" rdxPopoverClose aria-label="Close">
                                <lucide-angular [img]="XIcon" size="16" style="display: flex" />
                            </button>
                            <div
                                class="PopoverArrow"
                                [width]="arrowWidth()"
                                [height]="arrowHeight()"
                                rdxPopoverArrow
                            ></div>
                        </div>
                    </ng-template>
                </ng-container>
            </div>
            <div class="PopoverId">ID: {{ popoverRootDirective()?.uniqueId() }}</div>
        </popover-with-option-panel>
    `
})
export class RdxPopoverAnimationsComponent extends OptionPanelBase {
    readonly popoverRootDirective = viewChild(RdxPopoverRootDirective);

    readonly MountainSnowIcon = MountainSnow;
    readonly XIcon = X;

    readonly sides = RdxPositionSide;
    readonly aligns = RdxPositionAlign;

    cssAnimation = signal<boolean>(true);
    cssOpeningAnimation = signal(true);
    cssClosingAnimation = signal(true);
    protected readonly TriangleAlert = TriangleAlert;
    protected readonly containerAlert = containerAlert;
}
