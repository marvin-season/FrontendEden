export type ResolveType = (value: any) => void
export type RejectType = (value: any) => void
export type ExecutorType = (resolve: ResolveType, reject?: RejectType) => void
