import { applicationConfig, componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { RdxDialogCloseDirective } from '../src/dialog-close.directive';
import { RdxDialogContentDirective } from '../src/dialog-content.directive';
import { RdxDialogDescriptionDirective } from '../src/dialog-description.directive';
import { RdxDialogTitleDirective } from '../src/dialog-title.directive';
import { RdxDialogTriggerDirective } from '../src/dialog-trigger.directive';
import { provideRdxDialogConfig } from '../src/dialog.providers';

const html = String.raw;

export default {
    title: 'Examples/Sheet',
    decorators: [
        applicationConfig({
            providers: [provideRdxDialogConfig()]
        }),
        moduleMetadata({
            imports: [
                RdxDialogTriggerDirective,
                RdxDialogContentDirective,
                RdxDialogTitleDirective,
                RdxDialogCloseDirective,
                RdxDialogDescriptionDirective
            ]
        }),
        componentWrapperDecorator(
            (story) => html`
                <div
                    class="radix-themes light light-theme radix-themes-default-fonts rt-Flex rt-r-ai-start rt-r-jc-center rt-r-position-relative"
                    data-accent-color="indigo"
                    data-radius="medium"
                    data-scaling="100%"
                >
                    ${story}
                </div>
            `
        )
    ],
    argTypes: {
        mode: {
            options: ['sheet-right', 'sheet-bottom'],
            control: {
                type: 'select'
            }
        },
        backdropClass: {
            options: ['cdk-overlay-dark-backdrop', 'DialogSheetOverlay'],
            control: {
                type: 'select'
            }
        }
    },
    render: (args) => {
        return {
            props: {
                config: args
            },
            template: html`
                <button class="Button violet" [rdxDialogConfig]="config" [rdxDialogTrigger]="sheetTpl">
                    Open Sheet
                </button>

                <ng-template #sheetTpl>
                    <div class="DialogContent" rdxDialogContent>
                        <h2 class="DialogTitle" rdxDialogTitle>Edit profile</h2>
                        <p class="DialogDescription" rdxDialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </p>
                        <fieldset class="Fieldset">
                            <label class="Label" htmlFor="name">Name</label>
                            <input class="Input" id="name" defaultValue="Pedro Duarte" />
                        </fieldset>
                        <fieldset class="Fieldset">
                            <label class="Label" htmlFor="username">Username</label>
                            <input class="Input" id="username" defaultValue="@peduarte" />
                        </fieldset>
                        <div style="display:flex; margin-top: 25px; justify-content: flex-end;">
                            <button class="Button green" rdxDialogClose>Save changes</button>
                        </div>
                        <button class="IconButton" rdxDialogClose aria-label="Close">X</button>
                    </div>
                </ng-template>

                <style>
                    /* reset */
                    button,
                    fieldset,
                    input {
                        all: unset;
                    }

                    .DialogContent {
                        margin: 25px;
                    }

                    .DialogTitle {
                        margin: 0;
                        font-weight: 500;
                        color: var(--mauve-12);
                        font-size: 17px;
                    }

                    .DialogDescription {
                        margin: 10px 0 20px;
                        color: var(--mauve-11);
                        font-size: 15px;
                        line-height: 1.5;
                    }

                    .Button {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 4px;
                        padding: 0 15px;
                        font-size: 15px;
                        line-height: 1;
                        font-weight: 500;
                        height: 35px;
                    }

                    .Button.violet {
                        background-color: white;
                        color: var(--violet-11);
                        box-shadow: 0 2px 10px var(--black-a7);
                    }

                    .Button.violet:hover {
                        background-color: var(--mauve-3);
                    }

                    .Button.violet:focus {
                        box-shadow: 0 0 0 2px black;
                    }

                    .Button.green {
                        background-color: var(--green-4);
                        color: var(--green-11);
                    }

                    .Button.green:hover {
                        background-color: var(--green-5);
                    }

                    .Button.green:focus {
                        box-shadow: 0 0 0 2px var(--green-7);
                    }

                    .IconButton {
                        font-family: inherit;
                        border-radius: 100%;
                        height: 25px;
                        width: 25px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        color: var(--violet-11);
                        position: absolute;
                        top: 10px;
                        right: 10px;
                    }

                    .IconButton:hover {
                        background-color: var(--violet-4);
                    }

                    .IconButton:focus {
                        box-shadow: 0 0 0 2px var(--violet-7);
                    }

                    .Fieldset {
                        display: flex;
                        gap: 20px;
                        align-items: center;
                        margin-bottom: 15px;
                    }

                    .Label {
                        font-size: 15px;
                        color: var(--violet-11);
                        width: 90px;
                        text-align: right;
                    }

                    .Input {
                        width: 100%;
                        flex: 1;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 4px;
                        padding: 0 10px;
                        font-size: 15px;
                        line-height: 1;
                        color: var(--violet-11);
                        box-shadow: 0 0 0 1px var(--violet-7);
                        height: 35px;
                    }

                    .Input:focus {
                        box-shadow: 0 0 0 2px var(--violet-8);
                    }
                </style>
            `
        };
    }
} as Meta;

export const Default: StoryObj = {
    args: {
        backdropClass: 'cdk-overlay-dark-backdrop',
        mode: 'sheet-right',
        panelClasses: ['DialogSheet']
    }
};
