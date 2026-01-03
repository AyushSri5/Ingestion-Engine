import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Injectable } from "@nestjs/common";
import { Adaptive } from "src/adaptive-chunk/adaptive.service";


@Injectable()
export class IngestionService {

    constructor(
        private readonly adaptiveChunk:Adaptive
    ) {}
    async ingestData(path : string) {
        console.log(`Ingesting data from path: ${path}`);

        // For now using PDFLoader but have to move to UnstructuredPDFLoader or like that things

        const loader = new PDFLoader("src/ingestion/testing_doc.pdf");

        const docs = await loader.load();

        const formattedDocs = docs.map(doc => ({
            pageContent: doc.pageContent,
            metadata: { loc: doc.metadata?.loc || null }
        }));

        // console.log('Documents:', formattedDocs[3].metadata);


        // this.adaptiveChunk.adaptiveChunking("What is the exact definition of self attention in AI?",formattedDocs)

        this.adaptiveChunk.adaptiveChunking("How does the vanishing gradient problem in traditional RNNs limit their ability to model long-range dependencies, and how does the self-attention mechanism in Transformers address this specific limitation?",formattedDocs)

    }
}