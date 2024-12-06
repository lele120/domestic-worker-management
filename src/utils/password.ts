
import * as bcrypt from 'bcrypt';

export function saltAndHashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            reject(err);
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
            reject(err);
            }
            resolve(hash);
        });
        });
    });
    }

    
