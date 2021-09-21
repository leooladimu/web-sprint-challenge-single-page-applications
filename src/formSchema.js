import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Name is required!')
        .min(2, 'Name must be 3 characters long!'),
    // special: yup
    //     .string()
    //     .special('Pick!')
    //     .required('Pick!'),
    size: yup
        .string()
        .oneOf(['small', 'medium', 'large', 'Pick one!']),
    sauce: yup
        .string()
        .oneOf(['Original Red', 'Garlic Ranch', 'BBQ Sauce', 'Spinach Alfredo'], 'Civil status is required!'),
    
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    canadianBacon: yup.boolean(),spiceyItalianSausage: yup.boolean()
})

export default formSchema;