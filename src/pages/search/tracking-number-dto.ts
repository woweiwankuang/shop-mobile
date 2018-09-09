import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class TrackingNumberDTO {

    /**
     * 卖出时间
     */
    @JsonProperty('soldTime', Number)
    soldTime: number = undefined;

    /**
     * 商品名称
     */
    @JsonProperty('productName', String)
    productName: string = undefined;

    /**
     * 快递单号
     */
    @JsonProperty('trackingNumber', String)
    trackingNumber: string = undefined;
}
