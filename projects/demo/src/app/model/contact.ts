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

  /** Returns the full name. */
  public get name(): string {
    return [
      this.gender == 'male' ? 'Mr.' : this.gender == 'female' ? 'Ms.' : undefined,
      this.firstname,
      this.lastname,
    ].filter(str => !!str).map(str => str.trim()).join(' ');
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
      this.birthday ? `*${this.birthday.toLocaleDateString()}`: undefined,
    ].filter(str => !!str).map(str => str.trim()).join(', ');
  }

  public static get propertiesConfiguration(): PropertiesConfiguration {
    return [
      new PropertyConfiguration({
        propertyName: 'gender',
        label: 'Gender',
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
        label: 'First Name',
        propertyType: 'string',
        editable: true,
      }),
      new PropertyConfiguration({
        propertyName: 'lastname',
        label: 'Last Name',
        propertyType: 'string',
        editable: true,
      }),
      new PropertyConfiguration({
        propertyName: 'name',
        label: 'Full Name',
        propertyType: 'string',
        editable: false,
      }),
      new PropertyConfiguration({
        propertyName: 'birthday',
        label: 'Birthday',
        propertyType: 'date',
        editable: true,
      }),
      new PropertyConfiguration({
        propertyName: 'tel',
        label: 'Phone',
        propertyType: 'tel',
        editable: true,
      }),
      new PropertyConfiguration({
        propertyName: 'email',
        label: 'E-Mail Address',
        propertyType: 'email',
        editable: true,
      }),
      new PropertyConfiguration({
        propertyName: 'favorite',
        label: 'Favorite?',
        propertyType: 'boolean',
        editable: true,
      }),
      new PropertyConfiguration({
        propertyName: 'rating',
        label: 'Rating',
        propertyType: 'rating',
        editable: true,
      }),
    ];
  }

}
