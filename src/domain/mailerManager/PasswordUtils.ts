import {generate} from "generate-password";

export default class PasswordUtils {
    public static generate(): string {
        return generate({length: 10, numbers: true});
    }
}