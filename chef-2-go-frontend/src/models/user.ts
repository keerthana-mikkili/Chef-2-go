interface User {
    email: string;
    password?: string;
    name?: string;
    username: string;
    role: "admin" | "chef" | "customer"; // Define specific role values
    isPremiumUser?: boolean;
    token: string,
    _id: string;
    imageUrl?: string,
    isVerified?: boolean,
}

export default User;
