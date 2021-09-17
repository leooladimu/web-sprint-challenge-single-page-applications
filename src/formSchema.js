import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Name is required!')
        .min(3, "name must be at least 2 characters"),
    size: yup
        .string()
        .oneOf(['small', 'medium', 'large'], '☠︎ Pick a Size Or Die ☠︎'),
    sauce: yup
        .string()
        .oneOf(['original-red', 'garlic-ranch', 'bbq-sauce', 'spinach-alfredo'], "Choose a Suace Or Be Unceremoniously Decapitated ⚰ ✠ ✂︎ "),
    topping1: yup.boolean(),
    topping2: yup.boolean(),
    topping3: yup.boolean(),
    topping4: yup.boolean()
})

export default formSchema;

