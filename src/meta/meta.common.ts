import { Type } from '../util/type.utils';


export const META_ANNOTATIONS = "ecs:annotations";
export const META_PARAMETERS = "ecs:parameters";
export const META_PROPERTIES = "ecs:properties";
export const META_MODULE = "ecs:module";




/**
 * Retrieve metadata and/or define it
 * @param metadataKey 
 * @param obj 
 * @param defaultValue 
 */
export function GetOrDefineMetadata(metadataKey: string, obj: any, key: string | symbol = undefined, defaultValue: any = []): any {

    let annotation: any = GetMetadata(metadataKey, obj, key);

    if (!annotation) {
        annotation = defaultValue;
        Reflect.defineMetadata(metadataKey, annotation, obj, key);
    }

    return annotation;
}


/**
 * Retrieve metadata on an object with the given key
 * @param metadataKey 
 * @param obj 
 */
export function GetMetadata(metadataKey: string, obj: any, key?: string | symbol) {
    return Reflect.getMetadata(metadataKey, obj, key);
}


/**
 * Retrieves decoration metadata for a given prototype 
 * @param proto 
 */
export function GetPropertiesMetadata(proto: any): { [k: string]: any[] } {
    return GetMetadata(META_PROPERTIES, proto) || {};
}

/**
 * Retrieves decoration metadata on a type
 * @param type 
 */
export function GetTypeMetadata<T>(type: Type<T>): any[] {
    return GetMetadata(META_ANNOTATIONS, type) || [];
}

/**
 * Retrieves decoration metadata for a function's parameters
 * @param proto 
 */
export function GetParametersMetadata(type: Function, key?: string): any[] {
    return GetMetadata(META_PARAMETERS, type, key) || [];
}

/**
 * Find an annotation of a certain type on an object
 * @param metadataKey 
 * @param obj 
 * @param type 
 */
export function FindMetadataOfType<T>(metadataKey: string, obj: any, type: Type<T>): T {

    const data = GetMetadata(metadataKey, obj);

    if (!data || !data.length) {
        return null;
    }

    for (let i = 0; i < data.length; ++i) {
        if (data[i] instanceof type) {
            return data[i];
        }
    }

    return null;


}

/**
 * @private
 * @param properties A function that return a key-value map
 */
export function CreateMetadataCtor(properties?: (...args: any[]) => any) {
    return function ctor(...args: any[]) {
        if (properties) {
            const values = properties(...args);
            for (const name in values) {
                this[name] = values[name];
            }

        }
    }

}
