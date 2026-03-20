import { Address } from './address';
import { Contact, FriendType } from './contact';

export module ContactGenerator {

let maleFirstNames = ['John', 'Michael', 'David', 'Robert', 'James', 'William', 'Daniel', 'Matthew', 'Christopher', 'Joseph'];
let femaleFirstNames = ['Jane', 'Sarah', 'Emma', 'Lisa', 'Anna', 'Elizabeth', 'Susan', 'Laura', 'Jessica', 'Karen'];
let lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
const peanutsMaleFirstNames = ['Charlie', 'Linus', 'Snoopy', 'Woodstock', 'Schroeder', 'Pigpen', 'Marble', 'Spike', 'Rerun', 'Faron', 'Andy', 'Olaf', 'Leland', 'Randy'];
const peanutsFemaleFirstNames = ['Lucy', 'Sally', 'Marcie', 'Violet', 'Frieda', 'Eudora', 'Belle', 'Eleanor', 'Loretta', 'Lulu', 'Blossom'];
const peanutsLastNames = ['Brown', 'Van Pelt', 'Davis', 'Swanson', 'Johnson', 'Smith', 'Garcia', 'Miller'];
maleFirstNames = maleFirstNames.concat(peanutsMaleFirstNames);
femaleFirstNames = femaleFirstNames.concat(peanutsFemaleFirstNames);
lastNames = lastNames.concat(peanutsLastNames);

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
const streets = ['Main St', 'Oak Ave', 'Elm St', 'Maple Dr', 'Cedar Ln', 'Pine Rd', 'Birch Way', 'Ash Ct'];
const hobbies = ['Reading', 'Gaming', 'Photography', 'Cooking', 'Gardening', 'Hiking', 'Painting', 'Music', 'Swimming', 'Traveling'];
const bios = [
    'Passionate about technology and innovation',
    'Creative professional with 10+ years experience',
    'Outdoor enthusiast and nature lover',
    'Coffee addict and book collector',
    'Team player focused on collaboration',
    'Detail-oriented problem solver',
    'Lifelong learner and curious mind',
    'Community organizer and volunteer'
];
const indeterminateBooleanValues = [true, false, undefined];

/**
 * Generates a random Address object.
 */
export function generateRandomAddress(): Address {
    const address = new Address();
    address.street = streets[Math.floor(Math.random() * streets.length)];
    address.number = Math.floor(Math.random() * 9999) + 1;
    address.zipCode = Math.floor(Math.random() * 90000) + 10000;
    address.city = cities[Math.floor(Math.random() * cities.length)];
    address.country = 'USA';
    return address;
}

/**
 * Generates an array of random FriendType instances.
 */
export function generateRandomFriends(): FriendType[] {
    const count = Math.floor(Math.random() * 5) ; // Random number of friends between 0 and 4

    const friends: FriendType[] = [];
    for (let i = 0; i < count; i++) {
        friends.push({
            name: `${maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            type: ['Brother', 'Sister', 'Friend', 'Dog'][Math.floor(Math.random() * 4)] as any,
        });
    }

    return friends;
}

/**
 * Generates an array of random Contact instances.
 * @param count Number of contacts to generate. If undefined, generates a random number of contacts between 10 and 20.
 */
export function generateRandomContacts(count: number | undefined = undefined): Contact[] {
    const contacts: Contact[] = [];

    if (count === undefined) {
        count = Math.floor(Math.random() * 11) + 10; // Random number of contacts between 10 and 20
    }

    for (let i = 0; i < count; i++) {
        contacts.push(generateRandomContact());
    }
    return contacts;
}

    /**
     * Generates a single random Contact instance.
     */
    export function generateRandomContact(): Contact {
        const gender: 'male' | 'female' = Math.random() < 0.5 ? 'male' : 'female';
        const firstname = gender === 'male'
            ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
            : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
        const lastname = lastNames[Math.floor(Math.random() * lastNames.length)];
        const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@example.com`;
        const phone = `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
        const address = generateRandomAddress();
        const birthday = new Date(Date.now() - Math.floor(Math.random() * 50 * 365 * 24 * 60 * 60 * 1000)); // Random birthday in the last 50 years
        const selectedHobbies = hobbies.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 3) + 1);
        const bio = bios[Math.floor(Math.random() * bios.length)];
        const favorite = Math.random() < 0.3; // 30% chance to be a favorite
        let rating = Math.floor(Math.random() * 5) + 1; // Random rating between 1 and 5
        if (favorite) rating = 5; // Favorites always get a rating of 5
        const indeterminateBoolean = indeterminateBooleanValues[Math.floor(Math.random() * indeterminateBooleanValues.length)];

        return new Contact({
            gender,
            firstname,
            lastname,
            email,
            tel: phone,
            address,
            birthday,
            hobbies: selectedHobbies,
            friends: generateRandomFriends(),
            //bio,
            favorite,
            rating,
            indeterminateBoolean,
            country: 'us',
            language: 'en',
        });
    }

}
