import bcrypt from 'bcryptjs'

class HashHelper {

    makeHash(value) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(value, salt);
    }

    checkHash(givenValue, oldValue){
        return bcrypt.compare(givenValue, oldValue);
    }
}

export const {
    makeHash,
    checkHash
} = new HashHelper();