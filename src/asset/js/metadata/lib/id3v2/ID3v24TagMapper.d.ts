import { CaseInsensitiveTagMap } from '../common/CaseInsensitiveTagMap.js';
import type { INativeMetadataCollector } from '../common/MetadataCollector.js';
import type { IRating, ITag } from '../type.js';
export declare class ID3v24TagMapper extends CaseInsensitiveTagMap {
    static toRating(popm: any): IRating;
    constructor();
    /**
     * Handle post mapping exceptions / correction
     * @param tag to post map
     * @param warnings Wil be used to register (collect) warnings
     */
    protected postMap(tag: ITag, warnings: INativeMetadataCollector): void;
}
