import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsInt } from "class-validator";


export function IsIdArray({ maxSize, minSize }: { maxSize?: number, minSize: number }): PropertyDecorator {
    return function (target: any,
      propertyKey: string | symbol): void {
        IsArray()(target, propertyKey);
        IsInt({ each: true })(target, propertyKey);
        ArrayUnique()(target, propertyKey);
        if (maxSize)
            ArrayMaxSize(maxSize)(target, propertyKey);
        if (minSize)
            ArrayMinSize(minSize)(target, propertyKey);
    }
  }