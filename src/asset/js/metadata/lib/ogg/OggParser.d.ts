import { IGetToken } from 'strtok3';
import { BasicParser } from '../common/BasicParser.js';
import * as Ogg from './Ogg.js';
export declare class SegmentTable implements IGetToken<Ogg.ISegmentTable> {
    private static sum;
    len: number;
    constructor(header: Ogg.IPageHeader);
    get(buf: any, off: any): Ogg.ISegmentTable;
}
/**
 * Parser for Ogg logical bitstream framing
 */
export declare class OggParser extends BasicParser {
    private static Header;
    private header;
    private pageNumber;
    private pageConsumer;
    /**
     * Parse page
     * @returns {Promise<void>}
     */
    parse(): Promise<void>;
}
