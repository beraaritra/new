const validatePhone = (phone) => {
    const regex = /^[\d\s+()-]+$/;
    return regex.test(phone) && phone.length >= 6 && phone.length <= 15;
};

export default validatePhone