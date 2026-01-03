import { Module } from "@nestjs/common";
import { SemanticService } from "./semantic.service";
import { MetadataModule } from "src/metadata-enrich/metadata.module";


@Module({
    imports:[MetadataModule],
    providers: [SemanticService],
    exports: [SemanticService]
})

export class SemanticModule {}