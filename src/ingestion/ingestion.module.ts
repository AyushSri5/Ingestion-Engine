import { Module } from "@nestjs/common";
import { IngestionService } from "./ingestion.service";
import { ChunkModule } from "src/chunkers/chunk.module";
import { SemanticModule } from "src/semantic-chunk/semantic.module";
import { AdaptiveModule } from "src/adaptive-chunk/adaptive.module";


@Module({
    imports: [ChunkModule,SemanticModule,AdaptiveModule],
    providers: [IngestionService],
    exports: [IngestionService],
})

export class IngestionModule {}