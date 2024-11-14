const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
};

export default validateName