import * as React from 'react';
import { TypeOptions } from '../utils';
export interface CloseButtonProps {
    closeToast: (e: React.MouseEvent<HTMLElement>) => void;
    type: TypeOptions;
    ariaLabel?: string;
}
export declare function CloseButton({ closeToast, type, ariaLabel }: CloseButtonProps): JSX.Element;
