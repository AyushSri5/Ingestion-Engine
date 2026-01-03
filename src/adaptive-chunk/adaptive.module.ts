import { Module } from "@nestjs/common";
import { Adaptive } from "./adaptive.service";
import { SemanticModule } from "src/semantic-chunk/semantic.module";
import { ChunkModule } from "src/chunkers/chunk.module";


@Module({
    imports: [SemanticModule,ChunkModule],
    providers: [Adaptive],
    exports: [Adaptive]
})

export class AdaptiveModule {}