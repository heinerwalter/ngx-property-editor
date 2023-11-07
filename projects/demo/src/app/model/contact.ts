import { PropertiesConfiguration, PropertyConfiguration } from 'ngx-property-editor';

export class Contact {

  public gender: 'male' | 'female' | undefined;
  public firstname: string | undefined;
  public lastname: string | undefined;
  public birthday: Date | undefined;
  public tel: string | undefined;
  public email: string | undefined;
  public favorite: boolean = false;
  public rating: number | undefined;

  public get name(): string {
    return [
      this.gender == 'male' ? 'Mr.' : this.gender == 'female' ? 'Ms.' : undefined,
      this.firstname,
      this.lastname,
    ].filter(str => !!str).join(' ');
  }

  constructor(data?: {
    gender?: 'male' | 'female' | undefined,
    firstname?: string | undefined,
    lastname?: string | undefined,
    birthday?: Date | undefined,
    tel?: string | undefined,
    email?: string | undefined,
    favorite?: boolean | undefined,
    rating?: number | undefined,
  }) {
    this.gender = data?.gender;
    this.firstname = data?.firstname;
    this.lastname = data?.lastname;
    this.birthday = data?.birthday;
    this.tel = data?.tel;
    this.email = data?.email;
    this.favorite = data?.favorite || false;
    this.rating = data?.rating;
  }

  public toString(): string {
    return [
      this.name,
      this.birthday ? `* ${this.birthday.toLocaleDateString()}`: undefined,
    ].filter(str => !!str).join(', ');
  }

  public static get propertiesConfiguration(): PropertiesConfiguration {
    return [
      new PropertyConfiguration({
        propertyName: 'gender',
        propertyType: 'select',
        dataSource: [
          { name: 'male', value: 'male' },
          { name: 'female', value: 'female' },
        ],
        displayPropertyName: 'name',
        valuePropertyName: 'value',
        editable: true,
      }),
      new PropertyConfiguration({
        propertyName: 'firstname',
        propertyType: 'string',
        editable: true,
      }),
      new PropertyConfiguration({
        propertyName: 'lastname',
        propertyType: 'string',
        editable: true,
      }),
      new PropertyConfiguration({
        propertyName: 'birthday',
        propertyType: 'date',
        editable: true,
      }),
      new PropertyConfiguration({
        propertyName: 'tel',
        propertyType: 'tel',
        editable: true,
      }),
      new PropertyConfiguration({
        propertyName: 'email',
        propertyType: 'email',
        editable: true,
      }),
      new PropertyConfiguration({
        propertyName: 'favorite',
        propertyType: 'boolean',
        editable: true,
      }),
      new PropertyConfiguration({
        propertyName: 'rating',
        propertyType: 'rating',
        editable: true,
      }),
    ];
  }

}
