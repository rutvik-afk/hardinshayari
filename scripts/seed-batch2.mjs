import { publishBatch } from './lib/postgen.mjs';
import { BATCH2_POSTS } from './data/batch2.mjs';

await publishBatch(BATCH2_POSTS);
