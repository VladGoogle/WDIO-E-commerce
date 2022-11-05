export interface ChangeAccountInfoInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ChangePasswordInfoInterface {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface AccountInterfaces {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AddressBookInterface {
    firstName: string;
    lastName: string;
    company: string;
    phone: string;
    firstStreetAddress: string;
    secondStreetAddress: string;
    thirdStreetAddress: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}