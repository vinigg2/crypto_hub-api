import { ListBrokerageDTO } from '../dtos/list-brokerage.dtos';

export interface IBrokerageRepository {
  list(): Promise<ListBrokerageDTO[]>;
}
