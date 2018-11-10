import { JsonObject, JsonProperty } from 'json2typescript';
import { AbstractEntity } from '../model/common/abstract-entity';
/**
 * 库存
 */
@JsonObject
export class Stock extends AbstractEntity {
  /**
   * 名称
   */
  @JsonProperty('name', String)
  name: string = undefined;

  /**
   * 数量
   */
  @JsonProperty('num', Number)
  num: number = undefined;

  /**
   * 总售价
   */
  @JsonProperty('price', Number)
  price: number = undefined;

  /**
   * 规格
   */
  @JsonProperty('specification', String)
  specification: string = undefined;

  /**
   * 供应商
   */
  @JsonProperty('supplier', String)
  supplier: string = undefined;
}