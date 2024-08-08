import * as Token from 'token-types';
import * as util from '../common/Util.js';
export class AsfUtil {
    static getParserForAttr(i) {
        return AsfUtil.attributeParsers[i];
    }
    static parseUnicodeAttr(uint8Array) {
        return util.stripNulls(util.decodeString(uint8Array, 'utf-16le'));
    }
    static parseByteArrayAttr(buf) {
        return new Uint8Array(buf);
    }
    static parseBoolAttr(buf, offset = 0) {
        return AsfUtil.parseWordAttr(buf, offset) === 1;
    }
    static parseDWordAttr(buf, offset = 0) {
        return Token.UINT32_LE.get(buf, offset);
    }
    static parseQWordAttr(buf, offset = 0) {
        return Token.UINT64_LE.get(buf, offset);
    }
    static parseWordAttr(buf, offset = 0) {
        return Token.UINT16_LE.get(buf, offset);
    }
}
AsfUtil.attributeParsers = [
    AsfUtil.parseUnicodeAttr,
    AsfUtil.parseByteArrayAttr,
    AsfUtil.parseBoolAttr,
    AsfUtil.parseDWordAttr,
    AsfUtil.parseQWordAttr,
    AsfUtil.parseWordAttr,
    AsfUtil.parseByteArrayAttr
];
