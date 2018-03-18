import { JsonObject, JsonProperty } from 'json2typescript';
import { AbstractEntity } from '../model/common/abstract-entity';
/**
 * 用户
 */
@JsonObject
export class Customer extends AbstractEntity {

    /**
     * 顾客名称
     */
    @JsonProperty('realName', String)
    realName: string = undefined;

    /**
     * 手机号
     */
    @JsonProperty('phoneNum', String)
    phoneNum: string = undefined;

    /**
     * 常用地址
     */
    @JsonProperty('addresss', [String])
    addresss: string[] = undefined;

    constructor() {
        super();
        this.realName = '';
        this.phoneNum = '';
        this.addresss = [''];
    }
}