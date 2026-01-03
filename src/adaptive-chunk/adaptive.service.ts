import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { ChunkService } from "src/chunkers/chunk.service";
import { SemanticService } from "src/semantic-chunk/semantic.service";


@Injectable()
export class Adaptive{

    public constructor(
        private readonly chunkService:ChunkService,
        private readonly semanticService:SemanticService
    ) {}
    async adaptiveChunking(text: string,data: Array<{ pageContent: string, metadata: { loc: any } }>) {
        const queryType = `According to the text determine what should be the queryType in one word on basis of below cases
        1. If a question needs precise facts then query type should be factual
        2. If a question needs high-level concepts then query type should be conceptual
        3. If a question needs multi-hop reasoning then query type should be multihop
        `;
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY ,
        });
        // Call to LLM to determine query type
        const determinedQueryType = await client.responses.create({
            model: 'gpt-4o-mini',
            instructions: queryType,
            input: text
        });

        console.log("Determined query",determinedQueryType.output_text);
        
        if(determinedQueryType.output_text == 'conceptual' || determinedQueryType.output_text == 'multihop') {
            console.log("Using Semantic Chunking for adaptive chunking");

            this.semanticService.semanticChunk(data,512,20);
            
        }
        else {
            console.log("Using Regular Chunking for adaptive chunking");

            this.chunkService.chunkData(data,512,20);
        }
    }
}