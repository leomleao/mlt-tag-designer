export class Tag {
  constructor(tag) {
    let newTag;
    switch (typeof tag) {
      case 'string':
        try {
          newTag = JSON.parse(tag);
        } catch (err) {
          const typedName = tag.split('"')[1];
          const splitedTag = tag.split(' - ');
          const fontFamily = splitedTag[0].substring(
            tag.indexOf('with font') + 10
          );
          const colors = splitedTag[1].split(' & ');
          newTag = {
            typedName: typedName,
            fontFamily: fontFamily,
            insideColor: colors[0],
            outsideColor: colors[1],
          };
        }
        break;
      case 'object':
        newTag = Object(tag);
        break;
      default:
        newTag = {
          typedName: '',
          fontFamily: 'serif',
          insideColor: 'black',
          outsideColor: 'white',
        };
        break;
    }
    const { typedName, fontFamily, insideColor, outsideColor } = newTag;

    this.typedName = typedName;
    this.fontFamily = fontFamily;
    this.insideColor = insideColor;
    this.outsideColor = outsideColor;
  }
  logTag() {
    console.log(this);
  }
  toString() {
    return JSON.stringify(this);
  }
  toDescripton() {
    return `"${this.typedName}" with font ${this.fontFamily} - ${this.insideColor} & ${this.outsideColor}`;
  }
}
