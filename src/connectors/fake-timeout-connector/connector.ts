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

fetch("https://cp-wmv-716.cpstaging.online/grafx/api/v1/environment/cp-wmv-716/connectors/dc54d855-7178-44a7-9c8e-dd6ea88ae850/proxy?h=54cad6ca637a8c873d286645933d1cf8", {
  "headers": {
    "authorization": "Bearer <YOUR_TOKEN>",
    "x-grafx-proxy-external-authentication-source": "server",
    "x-grafx-proxy-external-method": "GET",
    "x-grafx-proxy-external-url": "https://dev.devapi.chiligrafx-dev.com/fake-connector",
  },
});