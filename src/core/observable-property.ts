function observablePropery(target: any, key: any) { // this is the decorator factory
    // // property value
    // console.log('this', target);
    // let _val = this[key];
    //
    // // property getter
    // const getter = function () {
    //     console.log(`Get: ${key} => ${_val}`);
    //     return _val;
    // };
    //
    // // @ts-ignore
    // const setter = function (newVal) {
    //     console.log(`Set: ${key} => ${newVal}`);
    //     _val = newVal;
    // };
    //
    // // Delete property.
    // if (delete this[key]) {
    //
    //     // Create new property with getter and setter
    //     Object.defineProperty(target, key, {
    //         get: getter,
    //         set: setter,
    //         enumerable: true,
    //         configurable: true
    //     });
    // }
}
//
// function observablePropery() {
//     console.log("f(): evaluated");
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         console.log("f(): called", target);
//     }
// }

export class Store {
    // @ts-ignore
    // @observablePropery value = 1;
}
