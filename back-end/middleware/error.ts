export const error = (message: string, code: number) => {
    const err = new Error(message);
    err['statusCode'] = code;
    return err;
};
