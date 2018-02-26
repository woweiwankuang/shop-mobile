import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';

export class JsonUtil {
  private static jsonConvertInstance = new JsonConvert();

  private static getJsonConvert(): JsonConvert {
    if (JsonUtil.jsonConvert) {
      return JsonUtil.jsonConvertInstance;
    }
    JsonUtil.jsonConvertInstance = new JsonConvert();
    JsonUtil.jsonConvertInstance.operationMode = OperationMode.ENABLE; // print some error data
    JsonUtil.jsonConvertInstance.ignorePrimitiveChecks = false; // allow assigning number to string etc.
    JsonUtil.jsonConvertInstance.valueCheckingMode = ValueCheckingMode.ALLOW_NULL; // allow null
    return JsonUtil.jsonConvertInstance;
  }

  public static jsonConvert(json: any, classReference: { new(): any }): any {
    if(json) {
      let result = {};
      try {
        result = JsonUtil.getJsonConvert().deserialize(json, classReference);
      }catch(e) {
        console.log(e);
      }
      return result;
    }else{
      return undefined;
    }

  }

  /**
   *字符串转json
   *
   */
  public static stringToJson(data) {
    return JSON.parse(data);
  }

  /**
   *json转字符串
   */
  public static jsonToString(data) {
    return JSON.stringify(data);
  }

  /**
   *map转换为json
   */
  public static mapToJson(map) {
    return JSON.stringify(JsonUtil.strMapToObj(map));
  }

  /**
   *json转换为map
   */
  public static jsonToMap(jsonStr) {
    return JsonUtil.objToStrMap(JSON.parse(jsonStr));
  }


  /**
   *map转化为对象（map所有键都是字符串，可以将其转换为对象）
   */
  public static strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
      obj[k] = v;
    }
    return obj;
  }

  /**
   *map转化为对象
   */
  public static mapToObj(map: Map<any, any>) {
    let obj = {};
    map.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }

  /**
   *对象转换为Map
   */
  public static objToStrMap(obj, keyIsNumber?: boolean, valueIsNumber?: boolean) {
    let map = new Map();
    let key: any;
    let value: any;
    for (let k of Object.keys(obj)) {
      key = k;
      value = obj[k];
      if (keyIsNumber) {
        key = +key;
      }
      if (valueIsNumber) {
        value = +value;
      }
      map.set(key, value);
    }
    return map;
  }
}
