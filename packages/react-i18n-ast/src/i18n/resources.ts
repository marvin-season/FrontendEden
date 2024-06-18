type FlatResourceType = {
    [k in keyof typeof initResources]: string;
};

const flatResource: (FlatResourceType & {
    id: string,
    var: string,
})[] = [
    {
        id: '1',
        var: 'welcome',
        zh: '欢迎',
        en: 'Welcome'
    },
    {
        id: '2',
        var: 'hi',
        zh: '你好',
        en: 'Hello'
    }
]

const initResources = {
    en: {
        translation: {
            '你   .好': {
                '他': 'ni-啊ao-ta'
            }
        }
    },
    zh: {
        translation: {}
    },
};

const reduceResources = flatResource.reduce((prev, cur) => {
    Object.keys(cur).forEach((k) => {
        const key = k as keyof typeof initResources;
        if (prev[key]) {
            Object.assign(prev[key].translation, {[cur.var]: cur[key]})
        }
    })

    return prev
}, initResources);

export const resources = reduceResources
