import { JsonObject, JsonProperty } from 'json2typescript';
/**
 * 用户
 */
@JsonObject
export class CreateUser {
  /**
   * 用户名
   */
  @JsonProperty('username', String)
  username: string = undefined;

  /**
   * 密码
   */
  @JsonProperty('password', String)
  password: string = undefined;

  /**
   * 密码2
   */
  @JsonProperty('password2', String)
  password2: string = undefined;

  checkPasswordSame(): boolean {
    return this.password === this.password2;
  }
}