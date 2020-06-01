

import { Type } from '../util/type.utils';
import { TypeDecorator, MakeTypeDecorator } from '../meta/type.decorator';



export interface SystemLike {
    update: () => void;
    postUpdate?: () => void;
}

export interface SystemDecorator {
    (meta?: System): TypeDecorator;
    new(meta: System): System
}


/**
 * System decorator. Systems are instanciated with DI
 * @param e 
 */
export const System: SystemDecorator = MakeTypeDecorator("System", (meta: System) => meta);


export interface System {
    use: Type<any>[];
}
