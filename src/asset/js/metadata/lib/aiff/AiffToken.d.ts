import * as iff from '../iff/index.js';
import type { IGetToken } from 'strtok3';
/**
 * The Common Chunk.
 * Describes fundamental parameters of the waveform data such as sample rate, bit resolution, and how many channels of
 * digital audio are stored in the FORM AIFF.
 */
export interface ICommon {
    numChannels: number;
    numSampleFrames: number;
    sampleSize: number;
    sampleRate: number;
    compressionType?: string;
    compressionName?: string;
}
export declare class Common implements IGetToken<ICommon> {
    private isAifc;
    len: number;
    constructor(header: iff.IChunkHeader, isAifc: boolean);
    get(buf: Uint8Array, off: number): ICommon;
}
