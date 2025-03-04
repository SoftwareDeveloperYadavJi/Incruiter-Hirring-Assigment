// genarater random long token string for password reset
export const generateRandomToken = (length: number): string => {
    let result = '';
    const characters = '0123456ABCDEFGHIJKL#$%#*&MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }
    return result;
};