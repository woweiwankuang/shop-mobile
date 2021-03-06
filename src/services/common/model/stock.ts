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
  @JsonProperty('specification')
  specification: string = undefined;

  /**
   * 供应商id
   */
  @JsonProperty('supplierId')
  supplierId: number = undefined;

  /**
   * 所属用户id
   */
  @JsonProperty('userId', Number)
  userId: number = undefined;
}