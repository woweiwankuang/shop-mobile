import { JsonObject, JsonProperty } from 'json2typescript';
import { AbstractEntity } from '../model/common/abstract-entity';
/**
 * 用户
 */
@JsonObject
export class SoldRec extends AbstractEntity {
  /**
   * 顾客id
   */
  @JsonProperty('customerId', Number)
  customerId: number = undefined;

  /**
   * 产品名称
   */
  @JsonProperty('productName', String)
  productName: string = undefined;

  /**
   * 邮寄地址
   */
  @JsonProperty('address', String)
  address: string = undefined;

  /**
   * 总成本
   */
  @JsonProperty('cost', Number)
  cost: number = undefined;

  /**
   * 总售价
   */
  @JsonProperty('price', Number)
  price: number = undefined;

  /**
   * 邮费
   */
  @JsonProperty('postage', Number)
  postage: number = undefined;


  /**
   * 利润
   */
  @JsonProperty('profit', Number)
  profit: number = undefined;

  /**
   * 产品数量
   */
  @JsonProperty('num', Number)
  num: number = undefined;

  /**
   * 卖出时间
   */
  @JsonProperty('soldTime', Number)
  soldTime: number = undefined;

  /**
   * 是否已经寄出
   */
  @JsonProperty('haveSend', Boolean)
  haveSend: boolean = undefined;

  /**
   * 快递单号
   */
  @JsonProperty('trackingNumber')
  trackingNumber: string = undefined;

  /**
   * 所属用户id
   */
  @JsonProperty('userId', Number)
  userId: number = undefined;
}