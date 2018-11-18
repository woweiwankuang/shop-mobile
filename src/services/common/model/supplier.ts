import { JsonObject, JsonProperty } from 'json2typescript';
import { AbstractEntity } from '../model/common/abstract-entity';
/**
 * 供应商
 */
@JsonObject
export class Supplier extends AbstractEntity {

  /**
   * 名称
   */
  @JsonProperty('name', String)
  name: string = undefined;

  /**
     * 手机号
     */
  @JsonProperty('phoneNum', String)
  phoneNum: string = undefined;

  /**
     * 备注
     */
  @JsonProperty('remark')
  remark: string = undefined;

  /**
 * 所属用户id
 */
  @JsonProperty('userId', Number)
  userId: number = undefined;
}