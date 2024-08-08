import * as Token from 'token-types';
import { FourCcToken } from '../common/FourCC.js';
export class Common {
    constructor(header, isAifc) {
        this.isAifc = isAifc;
        const minimumChunkSize = isAifc ? 22 : 18;
        if (header.chunkSize < minimumChunkSize)
            throw new Error(`COMMON CHUNK size should always be at least ${minimumChunkSize}`);
        this.len = header.chunkSize;
    }
    get(buf, off) {
        // see: https://cycling74.com/forums/aiffs-80-bit-sample-rate-value
        const shift = Token.UINT16_BE.get(buf, off + 8) - 16398;
        const baseSampleRate = Token.UINT16_BE.get(buf, off + 8 + 2);
        const res = {
            numChannels: Token.UINT16_BE.get(buf, off),
            numSampleFrames: Token.UINT32_BE.get(buf, off + 2),
            sampleSize: Token.UINT16_BE.get(buf, off + 6),
            sampleRate: shift < 0 ? baseSampleRate >> Math.abs(shift) : baseSampleRate << shift
        };
        if (this.isAifc) {
            res.compressionType = FourCcToken.get(buf, off + 18);
            if (this.len > 22) {
                const strLen = Token.UINT8.get(buf, off + 22);
                if (strLen > 0) {
                    const padding = (strLen + 1) % 2;
                    if (23 + strLen + padding === this.len) {
                        res.compressionName = new Token.StringType(strLen, 'latin1').get(buf, off + 23);
                    }
                    else {
                        throw new Error('Illegal pstring length');
                    }
                }
                else {
                    res.compressionName = undefined;
                }
            }
        }
        else {
            res.compressionName = 'PCM';
        }
        return res;
    }
}
