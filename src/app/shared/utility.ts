export class Utility {
  static getNewArray(array:string[], value: string, index?: number): string[] {
    const newArray = [...array];
    if (index!== undefined) {
      newArray.splice(index,1,value);
      return [...newArray]
    }
    else {
      newArray.push(value);
      return [...newArray ];
    }
  }

  static enumToObject(enums: any) {
    const arr = Object.keys(enums).map(element => element.toLowerCase())
    return arr.reduce((acc: { [x: string]: string; }, cur: string,) => {
      acc[cur] = "";
      return acc;
    }, {});
  }

}