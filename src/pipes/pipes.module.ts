import { NgModule } from '@angular/core';
import { PostTimePipe } from './post-time/post-time';
import { ThumbnailPipe } from './thumbnail/thumbnail';
@NgModule({
	declarations: [PostTimePipe,
    ThumbnailPipe],
	imports: [],
	exports: [PostTimePipe,
    ThumbnailPipe]
})
export class PipesModule {}
