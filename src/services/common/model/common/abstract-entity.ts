import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export abstract class AbstractEntity {
  @JsonProperty('id', Number, true)
  id: number = undefined;

  @JsonProperty('createTime', Number, true)
  createTime: number = undefined;

  @JsonProperty('lastModified', Number, true)
  lastModified: number = undefined;

  init() {
    this.id = 0;
    this.createTime = 0;
    this.lastModified = 0;
  }
}
