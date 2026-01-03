import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Injectable } from "@nestjs/common";
import { MetadataService } from "src/metadata-enrich/metadata.service";


@Injectable()
export class SemanticService {

    public constructor(private readonly metadataService: MetadataService){}

    async semanticChunk(data: Array<{ pageContent: string, metadata: { loc: any } }>, chunkSize: number, overlap: number) {
        let chunks: Array<{ text: string; metadata: { loc?: any } }> = [];

        const splitter = new RecursiveCharacterTextSplitter({chunkSize,chunkOverlap:overlap});

        for(const doc of data){
            const text = doc.pageContent;

            const docChunks = await splitter.splitText(text);

            for(const chunk of docChunks){
                const chunk_object = {
                    text: chunk,
                    metadata: doc.metadata || {}
                }
                chunks.push(chunk_object);
            }
        }
        console.log("Semantic Chunks",JSON.stringify(chunks[0]));
        
        console.log("Semantic Chunks created:", chunks.length);

        this.metadataService.enrichMetadata(chunks);
        
    }
}