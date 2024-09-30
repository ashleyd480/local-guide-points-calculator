export const validateHomeInputs = (setFormError, formData) => {

    let isValid = true; 
    let errorMessage = "";

    if (!formData.points) {
        errorMessage = "Points can't be blank. You must enter a number.";
        setFormError(errorMessage);
        isValid = false;
    }

    return isValid;
}