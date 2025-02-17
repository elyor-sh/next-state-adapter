export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
	phone: string;
	website: string;
	company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if(!response.ok){
            return []
        }

        return response.json()

    }catch (e) {
        return []
    }
}