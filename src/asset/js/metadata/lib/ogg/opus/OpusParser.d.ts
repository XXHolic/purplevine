import { ITokenizer } from 'strtok3';
import { IPageHeader } from '../Ogg.js';
import { VorbisParser } from '../vorbis/VorbisParser.js';
import { IOptions } from '../../type.js';
import { INativeMetadataCollector } from '../../common/MetadataCollector.js';
/**
 * Opus parser
 * Internet Engineering Task Force (IETF) - RFC 6716
 * Used by OggParser
 */
export declare class OpusParser extends VorbisParser {
    private tokenizer;
    private idHeader;
    private lastPos;
    constructor(metadata: INativeMetadataCollector, options: IOptions, tokenizer: ITokenizer);
    /**
     * Parse first Opus Ogg page
     * @param {IPageHeader} header
     * @param {Uint8Array} pageData
     */
    protected parseFirstPage(header: IPageHeader, pageData: Uint8Array): void;
    protected parseFullPage(pageData: Uint8Array): Promise<void>;
    calculateDuration(header: IPageHeader): void;
}
