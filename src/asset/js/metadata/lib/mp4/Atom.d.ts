import * as AtomToken from './AtomToken.js';
import type { ITokenizer } from 'strtok3';
export type AtomDataHandler = (atom: Atom, remaining: number) => Promise<void>;
export declare class Atom {
    readonly header: AtomToken.IAtomHeader;
    extended: boolean;
    readonly parent: Atom;
    static readAtom(tokenizer: ITokenizer, dataHandler: AtomDataHandler, parent: Atom, remaining: number): Promise<Atom>;
    readonly children: Atom[];
    readonly atomPath: string;
    constructor(header: AtomToken.IAtomHeader, extended: boolean, parent: Atom);
    getHeaderLength(): number;
    getPayloadLength(remaining: number): number;
    readAtoms(tokenizer: ITokenizer, dataHandler: AtomDataHandler, size: number): Promise<void>;
    private readData;
}
