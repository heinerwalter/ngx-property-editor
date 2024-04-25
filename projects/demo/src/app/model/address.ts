export class Address {

  public street: string | undefined;
  public number: number | undefined;
  public zipCode: number | undefined;
  public city: string | undefined;
  public country: string | undefined;

  public toString(multiline: boolean = true): string {
    return [
      `${this.street} ${this.number}`.trim(),
      `${this.zipCode} ${this.city}`.trim(),
      this.country,
    ]
      .filter(line => !!line)
      .join(multiline ? '\n' : ', ');
  }

}
