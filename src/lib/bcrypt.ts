import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(password, salt);
    return hash
}

export const compare = async (password: string, storedPassword: string) => {
    const comparePassword = await bcrypt.compare(password, storedPassword);
    return comparePassword
}