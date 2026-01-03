import { Injectable } from "@nestjs/common";
import { encode } from "gpt-tokenizer";
import { DatabaseService } from "src/database-upsert/database.service";



@Injectable()
export class MetadataService {

    public constructor (
        private readonly databaseService: DatabaseService
    ){}

    async enrichMetadata(data: Array<{ text: string; metadata: any }>) {
        // console.log("Enriching metadata for data:", data);

        const enrichedData = data.map((item,index) => {
            // Dummy enrichment logic
            const enrichedMetadata = {
                page_number: item.metadata.loc.pageNumber || null,
                document_id: "To be decided",
                chunk_index: index,
                token_count: encode(item.text).length
            };

            return {
                text: item.text,
                metadata: enrichedMetadata
            };
        });

        console.log("Enriched data:", enrichedData[8]);

        this.databaseService.upsertData(enrichedData);

        return enrichedData;

    }
}