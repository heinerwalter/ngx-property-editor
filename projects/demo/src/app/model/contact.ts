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
  public friends: string[] = [];

  /** Returns the full name. */
  public get name(): string {
    return [
      this.gender == 'male' ? 'Mr.' : this.gender == 'female' ? 'Ms.' : undefined,
      this.firstname,
      this.lastname,
    ].map(str => str?.trim()).filter(str => !!str).join(' ');
  }

  public constructor(data?: {
    gender?: 'male' | 'female' | undefined,
    firstname?: string | undefined,
    lastname?: string | undefined,
    birthday?: Date | undefined,
    tel?: string | undefined,
    email?: string | undefined,
    favorite?: boolean | undefined,
    rating?: number | undefined,
    friends?: string[] | undefined,
  }) {
    this.gender = data?.gender;
    this.firstname = data?.firstname;
    this.lastname = data?.lastname;
    this.birthday = data?.birthday;
    this.tel = data?.tel;
    this.email = data?.email;
    this.favorite = data?.favorite || false;
    this.rating = data?.rating;
    this.friends = data?.friends || [];
  }

  public toString(): string {
    return [
      this.name,
      this.birthday ? `*${this.birthday.toLocaleDateString()}` : undefined,
    ].map(str => str?.trim()).filter(str => !!str).join(', ');
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
      new PropertyConfiguration({
        propertyName: 'friends',
        label: 'Friends',
        propertyType: 'string',
        isArray: true,
        editable: true,
      }),
    ];
  }

  public static get Snoopy(): Contact {
    return new Contact({
      firstname: 'Snoopy',
      birthday: new Date(1950, 9, 4),
      tel: '+1 23456789',
      email: 'snoopy@peanuts.com',
      favorite: true,
      rating: 5,
      friends: ['Woodstock'],
    });
  }

  public static get CharlieBrown(): Contact {
    return new Contact({
      gender: 'male',
      firstname: 'Charlie',
      lastname: 'Brown',
      birthday: new Date(1950, 9, 2),
      tel: '+1 23456789',
      email: 'charlie.brown@peanuts.com',
      favorite: true,
      rating: 4,
      friends: ['Snoopy', 'Sally'],
    });
  }

  public static get SallyBrown(): Contact {
    return new Contact({
      gender: 'female',
      firstname: 'Sally',
      lastname: 'Brown',
      birthday: new Date(1959, 4, 26),
      tel: '+1 23456789',
      email: 'sally.brown@peanuts.com',
      favorite: false,
      rating: 3,
      friends: ['Charlie', 'Snoopy'],
    });
  }

}
