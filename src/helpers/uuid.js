export const generate = () => {
    // const alpha = 'abcdefghijklmnopqrstuvwxyz';
    const num = '0123456789';
    let output = '', i = 0;
    do {
        // output += alpha[Math.floor(Math.random() * ((alpha.length - 1) - 0 +1)) + 0];
        output += num[Math.floor(Math.random() * ((num.length - 1) - 0 +1)) + 0];
        i++;
    } while (i < 16);
    return +output;
};
