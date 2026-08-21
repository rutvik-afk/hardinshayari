import { publishBatch } from './lib/postgen.mjs';
import { LAUNCH_POSTS } from './data/launch-batch.mjs';

await publishBatch(LAUNCH_POSTS);
