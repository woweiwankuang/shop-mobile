import { JsonObject, JsonProperty } from 'json2typescript';

/**
 * 用户
 */
@JsonObject
export class SoldRecStatistics {

  /**
 * 销售总额
 */
  @JsonProperty('totalPrice', Number)
  totalPrice: number = undefined;

  /**
   * 总成本
   */
  @JsonProperty('totalCost', Number)
  totalCost: number = undefined;

  /**
   * 总邮费
   */
  @JsonProperty('totalPostage', Number)
  totalPostage: number = undefined;

  /**
   * 总利润
   */
  @JsonProperty('totalProfit', Number)
  totalProfit: number = undefined;
}