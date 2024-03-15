export type PartialByKeys<T, K extends keyof T> = {
    [P in K]?: T[P]
} & Omit<T, K>

export type RequiredByKeys<T, K extends keyof T> = {
    [P in K]-?: T[P]
} & Omit<T, K>

export type FuncType = <T, K extends keyof T>(collects: T, value: K) => void

export type User = {
    name: string;
    age: string;
    address?: string
}

const user1: PartialByKeys<User, 'age'> = {
    name: '',
    address: ''
}

const user2: RequiredByKeys<User, 'address'> = {
    name: '',
    age: '',
    address: ''
}


export type CollectType = {
    a: number,
    b: number
}

const collects: CollectType = {
    a: 1,
    b: 2
}


const func = (collect: keyof CollectType) => {
    if (collect == 'a') {
    }
}

func('a')
