interface JsonBinConfig {
  apiToken: string;
  binId: string;
}

class Database {
  private apiToken: string;
  private binId: string;
  private baseUrl: string;

  constructor(config: JsonBinConfig) {
    this.apiToken = config.apiToken;
    this.binId = config.binId;
    this.baseUrl = "https://api.jsonbin.io/v3/b";
  }

  /**
   * Fetch the current data from the JSONBin
   */

  #getEndpoint() {
    return this.baseUrl + "/" + this.binId;
  }
  async read() {
    const defaultSchema = {
      products: [],
      categories: [],
      orders: [],
    };

    try {
      const response = await fetch(this.#getEndpoint());
      const data = await response.json();
      if (!data || typeof data !== "object") {
        return defaultSchema;
      }

      return {
        products: data?.record.products || [],
        categories: data?.record.categories || [],
        orders: data?.record.orders || [],
      };
    } catch (error) {
      console.error("Error reading from JSONBin:", error);
      return defaultSchema;
    }
  }
  /**
   * Update the JSONBin with new data
   * @param newData The new data to update the bin with
   */
  async update(newData: any): Promise<void> {
    let response;
    try {
      response = await $fetch(this.#getEndpoint(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": this.apiToken,
        },
        body: JSON.stringify(newData),
      });
    } catch (error: any) {
      throw new Error(`Error updating data: ${error.message}, ${error}`);
    }
  }
}

const runtimeConfig = useRuntimeConfig();

let dbConnection: Database | null = null;
export const getActiveDB = () => {
  if (!runtimeConfig.jsonBinApiKey || !runtimeConfig.jsonBinBinId) {
    throw new Error("wassup, api key or json bin id is missing chiggas");
  }
  console.log("himorty");
  if (dbConnection) return dbConnection;
  else {
    dbConnection = new Database({
      apiToken: runtimeConfig.jsonBinApiKey,
      binId: runtimeConfig.jsonBinBinId,
    });
    return dbConnection;
  }
};
