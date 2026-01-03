import { Injectable } from "@nestjs/common";
import { decode, encode } from "gpt-tokenizer";


@Injectable()
export class ChunkService {

    // Fixed Size Chunking with Overlap
    async chunkData(data: Array<{ pageContent: string, metadata: { loc: any } }>,chunkSize: number,overlap: number) {
        console.log(`Chunking data into size: ${chunkSize} with overlap: ${overlap}`);
        // Dummy implementation for chunking
    
        let chunks: Array<{text: string,metadata: any}> = [];
        for (let i = 0; i < data.length; i ++) {

            const tokens = encode(data[i].pageContent);

            const total_tokens = tokens.length;

            if(total_tokens <= chunkSize) {
                chunks.push({text: data[i].pageContent,metadata: data[i].metadata} );
            }
            else {
                let start_index = 0;

                while (start_index < total_tokens) {
                    let end_index = Math.min(start_index + chunkSize, total_tokens);
                    const chunk_tokens = tokens.slice(start_index, end_index);
                    let prev_start_index = start_index;
                    const chunk_text = decode(chunk_tokens);

                    const chunk_object = {text: chunk_text, metadata: data[i].metadata};

                    chunks.push(chunk_object);

                    start_index = end_index - overlap;

                    if(start_index <= prev_start_index){
                        start_index = prev_start_index + 1;
                    }
                }
            }
        }
        // console.log("Chunks created:", chunks);
        
        return chunks;
    }
}