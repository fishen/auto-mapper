// Generated by dts-bundle v0.7.3

declare module 'auto-mapping' {
    export { mapping } from "auto-mapping/decorator";
    export { map } from "auto-mapping/converter";
    export { DEFAULT_SOURCE, MAPPED, MAPPING, MAPPED as after } from "auto-mapping/constants";
    export { Converter, PropertyType } from "auto-mapping/interface";
}

declare module 'auto-mapping/decorator' {
    import { Converter, IProperty } from "auto-mapping/interface";
    /**
      * The required annotations for object mapping which can only be used on instance properties.
      * @param options mapping options
      */
    export function mapping<T = any>(options?: IProperty<T> | Converter<T>): (target: any, name?: string) => void;
}

declare module 'auto-mapping/converter' {
    import { Converter, IMappingOptions, PropertyType } from "auto-mapping/interface";
    /**
        * Global conversion function container
        */
    export const CONVERTERS: Map<PropertyType<any>, Converter<any>>;
    /**
        * Get the conversion function of the specified type.
        * @param type conversion type
        * @param options mapping options
        */
    export function getConverter<T>(type: PropertyType<T>, options: IMappingOptions): Converter<T>;
    /**
        * Map an object to an instance of the specified type.
        * @param src Data source object.
        * @param constuctor The type of instance, the constructor function of the class.
        * @param options Mapping options.
        */
    export function map<T extends new (...args: any[]) => any>(src: any, constuctor: T, options?: IMappingOptions): InstanceType<T> | null;
    export namespace map {
            var setDefaultConverter: (type: PropertyType<any>, converter: Converter<any>) => void;
    }
}

declare module 'auto-mapping/constants' {
    export const CURRENT_PATH = ".";
    export const DEFAULT_PROPERTY_SEP = ".";
    export const DEFAULT_SOURCE: unique symbol;
    export const PROPERTIES_KEY: unique symbol;
    export const MAPPING: unique symbol;
    export const MAPPED: unique symbol;
    export const DEFAULT_ORDER = 0;
}

declare module 'auto-mapping/interface' {
    export type Converter<T = any> = (value: any, src: any, dest: T, options: IMappingOptions) => any;
    export type PropertyType<T = any> = new (...args: any[]) => T;
    export interface IProperty<T = any> {
            /**
                * Default value, multiple data sources can specify multiple different default values.
                */
            default?: any;
            /**
                * The parent path of current property, the resulting path is `${domain}.${currentPropertyKey}`
                * The option domain will be ignored when used with path.
                */
            domain?: string;
            /**
                * The order for the property generated
                * @default 0
                */
            order?: number;
            /**
                * The property path in the source object, such as 'a.b.c','a.b[0].c',
                * @default current property name.
                */
            path?: string;
            /**
                * The source object name,
                * it is required if you want to map data from multiple data sources.
                * @default DEFAULT_SOURCE
                */
            source?: string | symbol;
            /**
                * The property decalre type, it is always necessary if the property type is an array.
                * such as String, [Number]
                */
            type?: PropertyType<T> | Converter<T> | [PropertyType<T>] | [Converter<T>];
    }
    export interface IMappingOptions {
            /**
                * Whether enable debug mode.
                */
            debug?: boolean;
            /**
                * The source object name, it is required if you want to map data from multiple data sources.
                * @default DEFAULT_SOURCE
                */
            source?: string | symbol;
            /**
                * Use the default mapping configuration when the current source configuration is missing.
                * @default true
                */
            useDefaultSource?: boolean;
            /**
                * Whether to allow the value to be set to null
                */
            nullable?: boolean;
            /**
                * Whether to allow the value to be set to NaN
                */
            allowNaN?: boolean;
            /**
                * Custom conversion function, only valid during the current mapping.
                * If you want to set a global conversion function, use the 'map.setDefaultConverter' function.
                */
            converters?: Map<PropertyType, Converter>;
    }
}

