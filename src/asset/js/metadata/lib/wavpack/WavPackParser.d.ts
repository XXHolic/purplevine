import { BasicParser } from '../common/BasicParser.js';
/**
 * WavPack Parser
 */
export declare class WavPackParser extends BasicParser {
    private audioDataSize;
    parse(): Promise<void>;
    parseWavPackBlocks(): Promise<void>;
    /**
     * Ref: http://www.wavpack.com/WavPack5FileFormat.pdf, 3.0 Metadata Sub-blocks
     * @param header Header
     * @param remainingLength
     */
    private parseMetadataSubBlock;
}
