export class Meta {
  code: string;
  message: string;
}

export class Response {
  meta: Meta = new Meta();
  // tslint:disable-next-line:ban-types
  data: Object;
}
