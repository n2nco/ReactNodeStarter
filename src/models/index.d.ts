import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UntitledModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class UntitledModel {
  readonly id: string;
  readonly userName?: string | null;
  readonly password?: string | null;
  readonly courseTime?: string | null;
  readonly courseName?: string | null;
  readonly courseDptName?: string | null;
  readonly courseNumber?: string | null;
  readonly contactEmail?: string | null;
  readonly paymentDetails?: string | null;
  readonly ip?: string | null;
  readonly institutionName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UntitledModel, UntitledModelMetaData>);
  static copyOf(source: UntitledModel, mutator: (draft: MutableModel<UntitledModel, UntitledModelMetaData>) => MutableModel<UntitledModel, UntitledModelMetaData> | void): UntitledModel;
}