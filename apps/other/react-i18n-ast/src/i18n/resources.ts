import {initResources} from "./initResource.ts";
import translations from './translations.json';
import lodash from 'lodash-es'

type FlatResourceType = {
    [k in keyof typeof initResources]: string;
};


const handelReduceResources = (arr: (FlatResourceType & {
    id: string,
    spec: string,
})[], init: typeof initResources) => arr.reduce((prev, cur) => {
    Object.keys(cur).forEach((k) => {
        const key = k as keyof typeof initResources;
        if (prev[key]) {
            Object.assign(prev[key].translation, {[cur.spec]: cur[key]})
        }
    })

    return prev
}, init);


const translationsResources = translations.map(translation => handelReduceResources(translation.collections, initResources))
const mergeResources = lodash.merge({}, ...translationsResources);
console.log("🚀  mergeResources", mergeResources)

export const resources = mergeResources
