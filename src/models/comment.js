export default class Comment {
  constructor(CommentData) {
    this.id = CommentData[`id`] ? CommentData[`id`] : null;
    this.text = CommentData[`comment`];
    this.name = CommentData[`author`];
    this.date = CommentData[`date`];
    this.emoji = CommentData[`emotion`];
  }

  toRAW() {
    return {
      "author": this.name,
      "comment": this.text,
      "date": this.date,
      "emotion": this.emoji
    };
  }

  static parseComment(CommentData) {
    return new Comment(CommentData);
  }

  static parseComments(CommentsData) {
    return CommentsData.map(Comment.parseComment);
  }
}
