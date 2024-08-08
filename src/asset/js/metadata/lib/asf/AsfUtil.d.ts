import { DataType } from './AsfObject.js';
export type AttributeParser = (buf: Uint8Array) => boolean | string | number | bigint | Uint8Array;
export declare class AsfUtil {
    static getParserForAttr(i: DataType): AttributeParser;
    static parseUnicodeAttr(uint8Array: Uint8Array): string;
    private static attributeParsers;
    private static parseByteArrayAttr;
    private static parseBoolAttr;
    private static parseDWordAttr;
    private static parseQWordAttr;
    private static parseWordAttr;
}
