import { ConnectorType } from '../../core/types';

export interface NewCommandOptions {
  type?: ConnectorType;
  connectorName?: string;
  out?: string;
}
