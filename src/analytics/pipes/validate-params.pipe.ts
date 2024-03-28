import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Count, Regionalities } from "../constants/anlytics.constant";

@Injectable()
export class AnalyticsPipe implements PipeTransform<string, string> {
    private validateRegionality(value: Regionalities): string {
        if (Object.values(Regionalities).includes(value)) {
            return value;
        }

        throw new BadRequestException(`Regionality must be one of this [${Object.values(Regionalities)}]`);
    }

    private validateCount(value: Count): string {
        if (Object.values(Count).includes(value)) {
            return value;
        }

        throw new BadRequestException(`Count must be one of this [${Object.values(Count)}]`);
    }

    transform(value: string, metadata: ArgumentMetadata) {
        switch (metadata.data) {
            case 'regionality':
                return this.validateRegionality(value as Regionalities);
            case 'count':
                return this.validateCount(value as Count);
        }

        throw new BadRequestException('Invalid value');
    }
}