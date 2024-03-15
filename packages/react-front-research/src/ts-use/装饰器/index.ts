import "reflect-metadata";

function sealed(constructor: Function) {
    Object.seal(constructor)
    Object.seal(constructor.prototype)
}

function enumerable(value: boolean) {
    return function (target: Greeter, propertyKey: string, descriptor: PropertyDescriptor) {

        console.log(target, propertyKey, descriptor)
        descriptor.enumerable = value;
    };
}

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
    console.log(formatMetadataKey, formatString, Reflect.metadata(formatMetadataKey, formatString))
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

export class Greeter {
    @format('hello, %s')
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        let formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    }
}

