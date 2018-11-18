import { JsonObject, JsonProperty } from 'json2typescript';
import { Stock } from '../../../services/common/model/stock';
import { Supplier } from '../../../services/common/model/supplier';


@JsonObject
export class StockDTO {
  /**
     * 库存信息
     */
  @JsonProperty('stock', Stock)
  stock: Stock = undefined;

  /**
   * 供应商信息
   */
  @JsonProperty('supplier', Supplier)
  supplier: Supplier = undefined;
}