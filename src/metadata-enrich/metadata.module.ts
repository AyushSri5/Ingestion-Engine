import { Module } from "@nestjs/common";
import { MetadataService } from "./metadata.service";
import { DatabaseModule } from "src/database-upsert/database.module";


@Module({
    imports: [DatabaseModule],
    providers: [MetadataService],
    exports: [MetadataService]
})

export class MetadataModule {}