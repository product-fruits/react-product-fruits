import { productFruits, ProductFruitsInitOptions, ProductFruitsUserObject } from 'npm-product-fruits';

export interface ProductFruitsComponentProps {
    workspaceCode: string;
    language: string;
    user: ProductFruitsUserObject;
    dontDestroy?: boolean; 
    lifeCycle?: 'neverUnmount' | 'unmount'; 
    config?: ProductFruitsInitOptions;
    debug?: boolean;
}

declare global {
    interface Window {
        productFruitsIsReady?: boolean;
        productFruitsReady?: () => void;
        productFruits?: typeof productFruits;
    }
}
