export class Ad {

    static readonly CATEGORIES = ['dog', 'cat'];
    static readonly GENDER = ['mužijak', 'ženka'];

    _id: string;
    title: string;
    name: string;
    gender: string;
    age: number;
    city: string;
    street: string;
    category: string;
    image: string;
    description: string;
    isUrgent: boolean;
    createdAt: string;

}