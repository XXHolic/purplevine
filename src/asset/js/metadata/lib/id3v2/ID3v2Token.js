import * as Token from 'token-types';
import * as util from '../common/Util.js';
/**
 * The picture type according to the ID3v2 APIC frame
 * Ref: http://id3.org/id3v2.3.0#Attached_picture
 */
export var AttachedPictureType;
(function (AttachedPictureType) {
    AttachedPictureType[AttachedPictureType["Other"] = 0] = "Other";
    AttachedPictureType[AttachedPictureType["32x32 pixels 'file icon' (PNG only)"] = 1] = "32x32 pixels 'file icon' (PNG only)";
    AttachedPictureType[AttachedPictureType["Other file icon"] = 2] = "Other file icon";
    AttachedPictureType[AttachedPictureType["Cover (front)"] = 3] = "Cover (front)";
    AttachedPictureType[AttachedPictureType["Cover (back)"] = 4] = "Cover (back)";
    AttachedPictureType[AttachedPictureType["Leaflet page"] = 5] = "Leaflet page";
    AttachedPictureType[AttachedPictureType["Media (e.g. label side of CD)"] = 6] = "Media (e.g. label side of CD)";
    AttachedPictureType[AttachedPictureType["Lead artist/lead performer/soloist"] = 7] = "Lead artist/lead performer/soloist";
    AttachedPictureType[AttachedPictureType["Artist/performer"] = 8] = "Artist/performer";
    AttachedPictureType[AttachedPictureType["Conductor"] = 9] = "Conductor";
    AttachedPictureType[AttachedPictureType["Band/Orchestra"] = 10] = "Band/Orchestra";
    AttachedPictureType[AttachedPictureType["Composer"] = 11] = "Composer";
    AttachedPictureType[AttachedPictureType["Lyricist/text writer"] = 12] = "Lyricist/text writer";
    AttachedPictureType[AttachedPictureType["Recording Location"] = 13] = "Recording Location";
    AttachedPictureType[AttachedPictureType["During recording"] = 14] = "During recording";
    AttachedPictureType[AttachedPictureType["During performance"] = 15] = "During performance";
    AttachedPictureType[AttachedPictureType["Movie/video screen capture"] = 16] = "Movie/video screen capture";
    AttachedPictureType[AttachedPictureType["A bright coloured fish"] = 17] = "A bright coloured fish";
    AttachedPictureType[AttachedPictureType["Illustration"] = 18] = "Illustration";
    AttachedPictureType[AttachedPictureType["Band/artist logotype"] = 19] = "Band/artist logotype";
    AttachedPictureType[AttachedPictureType["Publisher/Studio logotype"] = 20] = "Publisher/Studio logotype";
})(AttachedPictureType || (AttachedPictureType = {}));
/**
 * https://id3.org/id3v2.3.0#Synchronised_lyrics.2Ftext
 */
export var LyricsContentType;
(function (LyricsContentType) {
    LyricsContentType[LyricsContentType["other"] = 0] = "other";
    LyricsContentType[LyricsContentType["lyrics"] = 1] = "lyrics";
    LyricsContentType[LyricsContentType["text"] = 2] = "text";
    LyricsContentType[LyricsContentType["movement_part"] = 3] = "movement_part";
    LyricsContentType[LyricsContentType["events"] = 4] = "events";
    LyricsContentType[LyricsContentType["chord"] = 5] = "chord";
    LyricsContentType[LyricsContentType["trivia_pop"] = 6] = "trivia_pop";
})(LyricsContentType || (LyricsContentType = {}));
export var TimestampFormat;
(function (TimestampFormat) {
    TimestampFormat[TimestampFormat["notSynchronized0"] = 0] = "notSynchronized0";
    TimestampFormat[TimestampFormat["mpegFrameNumber"] = 1] = "mpegFrameNumber";
    TimestampFormat[TimestampFormat["milliseconds"] = 2] = "milliseconds";
})(TimestampFormat || (TimestampFormat = {}));
/**
 * 28 bits (representing up to 256MB) integer, the msb is 0 to avoid 'false syncsignals'.
 * 4 * %0xxxxxxx
 */
export const UINT32SYNCSAFE = {
    get: (buf, off) => {
        return buf[off + 3] & 0x7f | ((buf[off + 2]) << 7) |
            ((buf[off + 1]) << 14) | ((buf[off]) << 21);
    },
    len: 4
};
/**
 * ID3v2 header
 * Ref: http://id3.org/id3v2.3.0#ID3v2_header
 * ToDo
 */
export const ID3v2Header = {
    len: 10,
    get: (buf, off) => {
        return {
            // ID3v2/file identifier   "ID3"
            fileIdentifier: new Token.StringType(3, 'ascii').get(buf, off),
            // ID3v2 versionIndex
            version: {
                major: Token.INT8.get(buf, off + 3),
                revision: Token.INT8.get(buf, off + 4)
            },
            // ID3v2 flags
            flags: {
                // Unsynchronisation
                unsynchronisation: util.getBit(buf, off + 5, 7),
                // Extended header
                isExtendedHeader: util.getBit(buf, off + 5, 6),
                // Experimental indicator
                expIndicator: util.getBit(buf, off + 5, 5),
                footer: util.getBit(buf, off + 5, 4)
            },
            size: UINT32SYNCSAFE.get(buf, off + 6)
        };
    }
};
export const ExtendedHeader = {
    len: 10,
    get: (buf, off) => {
        return {
            // Extended header size
            size: Token.UINT32_BE.get(buf, off),
            // Extended Flags
            extendedFlags: Token.UINT16_BE.get(buf, off + 4),
            // Size of padding
            sizeOfPadding: Token.UINT32_BE.get(buf, off + 6),
            // CRC data present
            crcDataPresent: util.getBit(buf, off + 4, 31)
        };
    }
};
export const TextEncodingToken = {
    len: 1,
    get: (uint8Array, off) => {
        switch (uint8Array[off]) {
            case 0x00:
                return { encoding: 'latin1' }; // binary
            case 0x01:
                return { encoding: 'utf-16le', bom: true };
            case 0x02:
                return { encoding: 'utf-16le', bom: false };
            case 0x03:
                return { encoding: 'utf8', bom: false };
            default:
                return { encoding: 'utf8', bom: false };
        }
    }
};
/**
 * Used to read first portion of `SYLT` frame
 */
export const TextHeader = {
    len: 4,
    get: (uint8Array, off) => {
        return {
            encoding: TextEncodingToken.get(uint8Array, off),
            language: new Token.StringType(3, 'latin1').get(uint8Array, off + 1)
        };
    }
};
/**
 * Used to read first portion of `SYLT` frame
 */
export const SyncTextHeader = {
    len: 6,
    get: (uint8Array, off) => {
        const text = TextHeader.get(uint8Array, off);
        return {
            encoding: text.encoding,
            language: text.language,
            timeStampFormat: Token.UINT8.get(uint8Array, off + 4),
            contentType: Token.UINT8.get(uint8Array, off + 5)
        };
    }
};
//# sourceMappingURL=ID3v2Token.js.map