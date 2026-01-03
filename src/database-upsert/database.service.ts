import { Injectable, Logger } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  private pinecone = new Pinecone({
    apiKey: process.env.PINECONE_DB || 'pcsk_27eTNr_59Li8VRA2vxPvdTUbQzv3AJ3XS2AvNak1cFzmBUzZ2f2oxS2ZmyufuA4M8wqdgQ', // ❗ DO NOT hardcode in real projects
  });

  private readonly indexName = 'document-chunks';
  private readonly dimension = 1536; // must match embedding model
  private readonly region = 'us-east-1';

  /**
   * Ensure index exists (idempotent)
   */
  private async ensureIndexExists(): Promise<void> {
    const indexes = await this.pinecone.listIndexes();

    const exists = indexes.indexes?.some(
      (index) => index.name === this.indexName,
    );

    if (!exists) {
      this.logger.log(`Index "${this.indexName}" not found. Creating...`);

      await this.pinecone.createIndex({
        name: this.indexName,
        dimension: this.dimension,
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: 'aws',
            region: this.region,
          },
        },
      });

      this.logger.log(`Index "${this.indexName}" created.`);
    }
  }

  async upsertData(data: Array<{ text: string; metadata: any }>) {
    // 1️⃣ Ensure index exists
    await this.ensureIndexExists();

    // 2️⃣ Get index
    const index = this.pinecone.index(this.indexName);

    // ⚠️ DEMO VECTOR ONLY
    // Replace with real embedding output (length must be 1536)
    const embeddingVector: number[] = new Array(this.dimension).fill(1);

    // 3️⃣ Upsert
    await index.upsert([
      {
        id: `uuid-${Date.now()}`,
        values: embeddingVector,
        metadata: {
          chunk_text: data[0]?.text ?? 'sample chunk',
          ...data[0]?.metadata,
        },
      },
    ]);

    

    this.logger.log('Upsert successful');
    return true;
  }
}
