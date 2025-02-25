import { Connector, Media } from '@chili-publish/studio-connectors';
const API_URL = 'https://dev.devapi.chiligrafx-dev.com/fake-connector';

export default class MyConnector implements Media.MediaConnector {
  private runtime: Connector.ConnectorRuntimeContext;

  constructor(runtime: Connector.ConnectorRuntimeContext) {
    this.runtime = runtime;
  }

  

  async query(
    options: Connector.QueryOptions,
    context: Connector.Dictionary
  ): Promise<Media.MediaPage> {

    const resp = await this.runtime.fetch(API_URL, {
      method: "GET"
    });

    if (resp.ok) {
      const data = JSON.parse(resp.text);
  
      // Transform the data to match the Media type
      const dataFormatted = data.map(d => ({
        id: d.id,
        name: d.id,
        relativePath: "/",
        type: 0,
        metaData: {}
      })) as Array<any>;
  
      return {
        pageSize: options.pageSize, // Note: pageSize is not currently used by the UI
        data: dataFormatted,
        links: {
          nextPage: "" // Pagination is ignored in this example
        }
      }
    }
  
    // Handle error case
    throw new Error("Failed to fetch images from picsum.photos");
  }

  detail(
    id: string,
    context: Connector.Dictionary
  ): Promise<Media.MediaDetail> {
    return fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      return {
        id: id,
          name: 'Test Media',
          relativePath: '/test-media.jpg',
          type: 0,
          metaData: {},
      }
    })
  }
  

  download(
    id: string,
    previewType: Media.DownloadType,
    intent: Media.DownloadIntent,
    context: Connector.Dictionary
  ): Promise<Connector.ArrayBufferPointer> {
    throw new Error('Method not implemented.');
  }

  getConfigurationOptions(): Connector.ConnectorConfigValue[] | null {
    return [];
  }

  getCapabilities(): Media.MediaConnectorCapabilities {
    return {
      query: true,
      detail: true,
      filtering: false,
      metadata: false,
    };
  }
}
