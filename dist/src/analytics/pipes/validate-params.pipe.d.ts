import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class AnalyticsPipe implements PipeTransform<string, string> {
    private validateRegionality;
    private validateCount;
    transform(value: string, metadata: ArgumentMetadata): string;
}
