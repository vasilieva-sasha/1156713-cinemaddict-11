export default class Comment {
  constructor(data) {
    this.id = data[`id`] ? data[`id`] : null;
    this.text = data[`comment`];
    this.name = data[`author`];
    this.date = data[`date`];
    this.emoji = data[`emotion`];
  }

  toRAW() {
    return {
      // "id": this.id,
      "author": this.name,
      "comment": this.text,
      "date": this.date,
      "emotion": this.emoji
    };
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }
}
