import {
  PropertiesConfiguration,
  PropertyConfiguration,
  PropertyConfigurationSeparator,
  PropertyEditorMode,
} from 'ngx-property-editor';
import { Address } from './address';

type FriendType = {
  name?: string | undefined,
  type?: 'Brother' | 'Sister' | 'Friend' | 'Dog' | undefined,
}

export class Contact {

  public gender: 'male' | 'female' | undefined;
  public firstname: string | undefined;
  public lastname: string | undefined;
  public birthday: Date | undefined;
  public address: Address = new Address();
  public tel: string | undefined;
  public email: string | undefined;
  public favorite: boolean = false;
  public indeterminateBoolean: boolean | undefined = undefined;
  public rating: number | undefined;
  public friends: FriendType[] = [];

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
    address?: Address | undefined,
    tel?: string | undefined,
    email?: string | undefined,
    favorite?: boolean | undefined,
    indeterminateBoolean?: boolean | undefined,
    rating?: number | undefined,
    friends?: FriendType[] | undefined,
  }) {
    this.gender = data?.gender;
    this.firstname = data?.firstname;
    this.lastname = data?.lastname;
    this.birthday = data?.birthday;
    this.address = data?.address || new Address();
    this.tel = data?.tel;
    this.email = data?.email;
    this.favorite = data?.favorite || false;
    this.indeterminateBoolean = data?.indeterminateBoolean;
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
      new PropertyConfigurationSeparator(),
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
      new PropertyConfigurationSeparator(),
      new PropertyConfiguration({
        propertyName: 'address',
        label: 'Address',
        editable: true,
        group: [
          [
            new PropertyConfiguration({
              propertyName: 'address.street',
              label: 'Street',
              propertyType: 'string',
              editable: true,
            }),
            new PropertyConfiguration({
              propertyName: 'address.number',
              label: 'Number',
              propertyType: 'number',
              editable: true,
            }),
          ],
          [
            new PropertyConfiguration({
              propertyName: 'address.zipCode',
              label: 'ZIP Code',
              propertyType: 'number',
              editable: true,
            }),
            new PropertyConfiguration({
              propertyName: 'address.city',
              label: 'City',
              propertyType: 'string',
              editable: true,
            }),
          ],
          [
            new PropertyConfiguration({
              propertyName: 'address.country',
              label: 'Country',
              propertyType: 'string',
              editable: true,
            }),
          ],
        ],
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
      new PropertyConfigurationSeparator(),
      new PropertyConfiguration({
        label: 'Additional Properties',
        disableGroup: (data: Contact, mode: PropertyEditorMode) => mode != 'table',
        group: [[
          new PropertyConfiguration({
            propertyName: 'favorite',
            label: 'Favorite?',
            propertyType: 'boolean',
            editable: true,
          }),
          new PropertyConfiguration({
            propertyName: 'indeterminateBoolean',
            label: 'Really?',
            propertyType: 'boolean-indeterminate',
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
            isArray: true,
            newArrayItemFunction: () => ({ name: undefined, type: undefined }),
            editable: true,
            hideIfEmpty: true,
            hidden: (data: Contact, mode: PropertyEditorMode) => {
              switch (mode) {
                case 'view':
                case 'edit':
                  return false;
                case 'table':
                  return true;
              }
            },
            group: [[
              new PropertyConfiguration({
                propertyName: 'name',
                label: 'Friend',
                propertyType: 'string',
                editable: true,
              }),
              new PropertyConfiguration({
                propertyName: 'type',
                label: 'Type',
                propertyType: 'select',
                dataSource: ['Brother', 'Sister', 'Friend', 'Dog'],
                editable: true,
              }),
            ]],
          }),
        ]],
      }),
      new PropertyConfigurationSeparator(),
    ];
  }

  public static get CharlieBrownAddress(): Address {
    const address = new Address();
    address.street = 'Street';
    address.number = 1;
    address.zipCode = 12345;
    address.city = 'City';
    address.country = 'United States of America';
    return address;
  }

  public static get Snoopy(): Contact {
    return new Contact({
      firstname: 'Snoopy',
      birthday: new Date(1950, 9, 4),
      address: this.CharlieBrownAddress,
      tel: '+1 23456789',
      email: 'snoopy@peanuts.com',
      favorite: true,
      rating: 5,
      friends: [
        { name: 'Woodstock', type: 'Friend' },
        { name: 'Charlie Brown' },
      ],
    });
  }

  public static get CharlieBrown(): Contact {
    return new Contact({
      gender: 'male',
      firstname: 'Charlie',
      lastname: 'Brown',
      birthday: new Date(1950, 9, 2),
      address: this.CharlieBrownAddress,
      tel: '+1 23456789',
      email: 'charlie.brown@peanuts.com',
      favorite: true,
      rating: 4,
      friends: [
        { name: 'Snoopy', type: 'Dog' },
        { name: 'Sally', type: 'Sister' },
      ],
    });
  }

  public static get SallyBrown(): Contact {
    return new Contact({
      gender: 'female',
      firstname: 'Sally',
      lastname: 'Brown',
      birthday: new Date(1959, 4, 26),
      address: this.CharlieBrownAddress,
      tel: '+1 23456789',
      email: 'sally.brown@peanuts.com',
      favorite: false,
      rating: 3,
      friends: [
        { name: 'Charlie', type: 'Brother' },
        { name: 'Snoopy', type: 'Dog' },
      ],
    });
  }

}
