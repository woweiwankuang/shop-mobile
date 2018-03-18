import { JsonObject, JsonProperty } from 'json2typescript';

import { Customer } from '../../../services/common/model/customer';
import { SoldRec } from '../../../services/common/model/sold-rec';

@JsonObject
export class SoldRecDTO {

    /**
     * 销售记录
     */
    @JsonProperty('soldRec', SoldRec)
    soldRec: SoldRec = undefined;

    /**
     * 顾客信息
     */
    @JsonProperty('customer', Customer)
    customer: Customer = undefined;
}
