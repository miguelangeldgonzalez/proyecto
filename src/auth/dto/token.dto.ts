export interface ReturnVerifyTokenDto {
    /**
     * Issued At - Is the time that was created the token
     */
    iat: number;

    /**
     * Expiration Time - Is the time that the token will expire
     */
    exp: number;
}